const connection = require('../../database/connection');

const { authorizationUserHasFarm } = require('../../auth/utils/verifyUserAuthenticate');

const createSale = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context)

		const idFarm = context._userAuthenticate.idFarm,
			{idBreeds, gender, AgeGroup, amount} = args.input,
			saleData = args.input;

		let age = AgeGroup(new Date());

		let listAnimals = await connection('animal')
			.select('id')
			.where({idBreeds, gender, hasNow:  true, idFarm})
			.where('dateBirth', '<=', age.start.getTime())
			.where('dateBirth', '>', age.end.getTime());

		if(listAnimals.length<amount)
			throw new Error(JSON.stringify({status: "Don't have animal"}));

		delete saleData.AgeGroup;

		const trx = await connection.transaction();

		const [saleId] = await trx('sale').insert({
			...saleData,
			idFarm
		});

		for(let v = 0; v < amount; v++){
			let idAnimal = listAnimals[v].id;
			await trx('animal')
				.where({id: idAnimal})
				.update({
					hasNow: false
				});

			await trx('transaction_with_animal')
				.insert({
					idAnimal,
					idTransaction: saleId,
					idFarm,
					type: 'sale'
				});
		}

		await trx.commit();

		return {
			id: saleId,
			...saleData
		};
	} catch (e) {
		throw new Error(e.message);
	}
};

const deleteSale = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm,
			idTransaction = args.id;

		let listAnimals = await connection('transaction_with_animal')
			.where({idTransaction, type: 'sale', idFarm});

		const trx = await connection.transaction();

		await trx('sale')
			.where({id: idTransaction})
			.delete();

		for(let {idAnimal} of listAnimals){
			await trx('animal')
				.where({id: idAnimal})
				.update({ hasNow: true });

			await trx('transaction_with_animal')
				.where({idAnimal, idTransaction, type: 'sale'})
				.delete();
		}

		await trx.commit();

		return true;
	} catch (e) {
		throw new Error(e.message);
	}
};

const updateSale = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm,
			idTransaction = args.id,
			contentSale = { ...args.input };


		const isUpdated = await connection('sale')
			.where({id: idTransaction, idFarm})
			.update({ ...contentSale });

		if(!isUpdated)
			throw new Error(`Sale don't found`);

		let item = await connection('sale')
			.where({id: idTransaction, idFarm})
			.first();

		return item;
	} catch (e) {
		throw new Error(e.message);
	}
};

module.exports = {
	createSale,
	deleteSale,
	updateSale
};