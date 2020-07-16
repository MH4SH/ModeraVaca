const connection = require('../../database/connection');

const deadList = [
  {id: 1, gender: 'f', age: 1, idCard: 1, amount: 12},
  {id: 2, gender: 'f', age: 2, idCard: 1, amount: 22},
  {id: 3, gender: 'f', age: 3, idCard: 1, amount: 11},
  {id: 4, gender: 'f', age: 4, idCard: 1, amount: 14},
  {id: 5, gender: 'f', age: 2, idCard: 2, amount: 2},
  {id: 6, gender: 'f', age: 1, idCard: 2, amount: 22},
  {id: 7, gender: 'f', age: 3, idCard: 2, amount: 23},
  {id: 8, gender: 'f', age: 4, idCard: 2, amount: 44},
  {id: 9, gender: 'f', age: 6, idCard: 2, amount: 11},
  {id: 10, gender: 'm', age: 7, idCard: 1, amount: 1}
];

const createDead = async (_, args) => {
  try {
	const {idBreeds, gender, AgeGroup} = args.input,
	  data = args.input;

	let age = AgeGroup(new Date());

	let listAnimals = await connection('animal')
	.where('idBreeds', idBreeds)
	.where('gender', gender)
	.where('hasNow', true)
	.where('dateBorn', '<=', age.start.getTime())
	.where('dateBorn', '>', age.end.getTime());

	if(listAnimals.length===0)
	  throw new Error(JSON.stringify({status: "Don't have animal"}));

	let idAnimal = listAnimals[0].id;
	
	delete data.AgeGroup;

	const trx = await connection.transaction();


	const [deadId] = await trx('dead').insert({
	  ...data,
	  amount: 3,
	  idFarm: args.idFarm,
	  created: new Date()
	});

	await trx('animal')
	.where('id', idAnimal)
	.update({
	  hasNow: false
	});


	await trx('transaction_with_animal').insert({
	  idAnimal: idAnimal,
	  idTransaction: deadId,
	  type: 'dead'
	});


	await trx.commit();

	return {
	  id: deadId,
	  ...data
	};
  } catch (e) {
	throw new Error(e.message);
  }
};

const deleteDead = async (_, args) => {
  try {
	let animal = await connection('transaction_with_animal')
	.where('idTransaction', args.id)
	.where('type', 'dead')
	.first();

	if(!animal)
	  return false;

	const trx = await connection.transaction();

	await trx('animal')
	.where('id', animal.idAnimal)
	.update({ hasNow: true });

	await trx('dead')
	.where('id', args.id)
	.delete();

	await trx('transaction_with_animal')
	.where('id', animal.id)
	.delete();

	await trx.commit();

	return true;
  } catch (e) {
	throw new Error(e.message);
  }
};

const updateDead = async (_, args) => {
  try {
	const content = {...args.input};

	await connection('dead')
	.where('id', args.id)
	.update({ ...content });

	let item = await connection('dead')
	.where('id', args.id)
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