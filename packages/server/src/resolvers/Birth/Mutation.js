const connection = require('../../database/connection');

const { authorizationUserHasFarm } = require('../../auth/utils/verifyUserAuthenticate');

const createBirth = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm,
			birthData = args.input;

		const trx = await connection.transaction();


		const [birthId] = await trx('birth').insert({
			...birthData,
			idFarm
		});

		for (let v = 0; v < birthData.amount; v++) {
			let [idAnimal] = await trx('animal')
				.insert({
					idBreeds: birthData.idBreeds,
					gender: birthData.gender,
					dateBirth: birthData.dateBirth,
					idFarm,
					type: 'birth'
				});


			await trx('transaction_with_animal')
				.insert({
					idAnimal,
					idTransaction: birthId,
					idFarm,
					type: 'birth'
				});
		}

		await trx.commit();

		return {
			id: birthId,
			...birthData
		};
	} catch (e) {
		throw new Error(e.message);
	}
};

const deleteBirth = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm,
			idTransaction = args.id,
			isForceDelete = args.force;

		let listAnimals = await connection('transaction_with_animal')
			.where({idTransaction, type: 'birth', idFarm});

		let { amountCreated } = await connection('transaction_with_animal')
				.where({ idTransaction, type: 'dead', idFarm })
				.orWhere({ idTransaction, type: 'sale', idFarm })
				.count({ amountCreated: 'id' })
				.first();

		if (!isForceDelete && amountCreated !== 0)
				throw new Error(JSON.stringify({ status: "Need Force", number: amountCreated }));

		if (listAnimals.length === 0)
			return false;

		const trx = await connection.transaction();

		await trx('birth')
			.where({id: idTransaction})
			.delete();

		for (let { idAnimal } of listAnimals) {

			await trx('animal')
				.where({id: idAnimal})
				.delete();

			await trx('transaction_with_animal')
				.where({idAnimal, idTransaction, type: 'birth'})
				.delete();

		}

		await trx.commit();

		return true;
	} catch (e) {
		throw new Error(e.message);
	}
};

const updateBirth = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm,
			idTransaction = args.id,
			contentBirth = { ...args.input };


		const isUpdated = await connection('birth')
			.where({id: idTransaction, idFarm})
			.update({ ...contentBirth });

		if(!isUpdated)
			throw new Error(`Birth don't found`);

		let item = await connection('birth')
			.where({id: idTransaction, idFarm})
			.first();

		return item;
	} catch (e) {
		throw new Error(e.message);
	}
};

module.exports = {
	createBirth,
	deleteBirth,
	updateBirth
};