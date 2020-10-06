const connection = require("../../database/connection");
const { authorizationUserHasFarm } = require('../../auth/utils/verifyUserAuthenticate');
const createPurchase = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm,
      purchaseData = args.input;
      
    purchaseData.dateBirth = new Date(purchaseData.dateBirth);

		const trx = await connection.transaction();

		const [purchaseId] = await trx('purchase')
			.insert({
				...purchaseData,
				idFarm
			})


		for(let v = 0; v < purchaseData.amount; v++){
				
			let [idAnimal] = await trx('animal')
				.insert({
					idBreeds: purchaseData.idBreeds,
					gender: purchaseData.gender,
					dateBirth: purchaseData.dateBirth,
					idFarm,
					type: 'purchase'
				});

			await trx('transaction_with_animal')
				.insert({
					idAnimal,
					idTransaction: purchaseId,
					idFarm,
					type: 'purchase'
				});
		}

		await trx.commit();

		return {
			id: purchaseId,
			...purchaseData
		};
	} catch (e) {
		throw new Error(e.message);
	}
};

const deletePurchase = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm,
			idTransaction = args.id,
			isForceDelete = args.force;

		let listAnimals = await connection('transaction_with_animal')
			.where({idTransaction, type: 'purchase', idFarm});
		
		let {amountCreated} = await connection('transaction_with_animal')
			.where({idTransaction, type: 'dead', idFarm})
			.orWhere({idTransaction, type: 'sale', idFarm})
			.count({amountCreated: 'id'})
			.first();
			
		if(!isForceDelete && amountCreated !== 0)
			throw new Error(JSON.stringify({status: "Need Force", number: amountCreated}));

		if(listAnimals.length===0)
			return false;

		const trx = await connection.transaction();

		await trx('purchase')
			.where({id: idTransaction})
			.delete();

		for(let { idAnimal } of listAnimals){

		await trx('animal')
			.where({id: idAnimal})
			.delete();

		await trx('transaction_with_animal')
			.where({idAnimal, idTransaction, type: 'purchase'})
			.delete();

		}

		await trx.commit();

		return true;
	} catch (e) {
		throw new Error(e.message);
	}
};

const updatePurchase = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm,
			idTransaction = args.id,
			contentPurchase = { ...args.input };


		const isUpdated = await connection('purchase')
			.where({id: idTransaction, idFarm})
			.update({ ...contentPurchase });

		if(!isUpdated)
			throw new Error(`Purchase don't found`);

		let item = await connection('purchase')
			.where({id: idTransaction})
			.first();

		return item;
	} catch (e) {
		throw new Error(e.message);
	}
};

module.exports = {
	createPurchase,
	deletePurchase,
	updatePurchase
};