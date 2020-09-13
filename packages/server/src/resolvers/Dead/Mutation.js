const connection = require('../../database/connection');

const { authorizationUserHasFarm } = require('../../auth/utils/verifyUserAuthenticate');


const createDead = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm,
			deadData = args.input,
			{idBreeds, gender, AgeGroup} = args.input;

		let age = AgeGroup(new Date());

		let listAnimals = await connection('animal')
			.where({idBreeds, gender, idFarm, hasNow: true})
			.where('dateBirth', '<=', age.start.getTime())
			.where('dateBirth', '>', age.end.getTime());

		if(listAnimals.length===0)
			throw new Error(JSON.stringify({status: "Don't have animal"}));

		let idAnimal = listAnimals[0].id;
		
		delete deadData.AgeGroup;

		const trx = await connection.transaction();


		const [deadId] = await trx('dead')
			.insert({
				...deadData,
				idFarm
			});

		await trx('animal')
			.where({id: idAnimal})
			.update({
				hasNow: false
			});


		await trx('transaction_with_animal')
			.insert({
				idAnimal,
				idTransaction: deadId,
				idFarm,
				type: 'dead'
			});


		await trx.commit();

		return {
			id: deadId,
			...deadData
		};
	} catch (e) {
		throw new Error(e.message);
	}
};

const deleteDead = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm,
			idTransaction = args.id;

		let animal = await connection('transaction_with_animal')
			.where({idTransaction, idFarm, type: dead})
			.first();

		if(!animal)
			return false;

		const trx = await connection.transaction();

		await trx('animal')
			.where({id: animal.idAnimal})
			.update({ hasNow: true });

		await trx('dead')
			.where({id: idTransaction})
			.delete();

		await trx('transaction_with_animal')
			.where({id: animal.id})
			.delete();

		await trx.commit();

		return true;
	} catch (e) {
		throw new Error(e.message);
	}
};

const updateDead = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm,
			idTransaction = args.id,
			deadData = {...args.input};

		const isUpdated = await connection('dead')
			.where({id: idTransaction, idFarm})
			.update({ ...deadData });

		if(!isUpdated)
			throw new Error(`Birth don't found`);

		let item = await connection('dead')
			.where({id: idTransaction})
			.first();

		return item;
	} catch (e) {
		throw new Error(e.message);
	}
};

module.exports = {
	createDead,
	deleteDead,
	updateDead
};