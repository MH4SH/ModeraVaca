const connection = require('../../database/connection');

const createSale = async (_, args) => {
  try {
	const {idBreeds, gender, AgeGroup, amount} = args.input,
	  data = args.input;

	let age = AgeGroup(new Date());

	let listAnimals = await connection('animal')
	  .select('id')
	  .where('idBreeds', idBreeds)
	  .where('gender', gender)
	  .where('hasNow', true)
	  .where('dateBorn', '<=', age.start.getTime())
	  .where('dateBorn', '>', age.end.getTime());

	if(listAnimals.length<amount)
	  throw new Error(JSON.stringify({status: "Don't have animal"}));

	
	delete data.AgeGroup;

	const trx = await connection.transaction();

	const [saleId] = await trx('sale').insert({
	  ...data,
	  idFarm: args.idFarm,
	  created: new Date()
	});


	for(let v = 0; v < amount; v++){
	  let idAnimal = listAnimals[v].id;
	  await trx('animal')
		.where('id', idAnimal)
		.update({
		  hasNow: false
		});

	  await trx('transaction_with_animal').insert({
		idAnimal,
		idTransaction: saleId,
		type: 'sale'
	  });
	}

	await trx.commit();

	return {
		id: saleId,
		...data
	  };
  } catch (e) {
	throw new Error(e.message);
  }
};

const deleteSale = async (_, args) => {
  try {
	let listAnimals = await connection('transaction_with_animal')
	  .where('idTransaction', args.id)
	  .where('type', 'sale');

	const trx = await connection.transaction();

	await trx('sale')
	  .where('id', args.id)
	  .delete();

	for(let {idAnimal} of listAnimals){
	  await trx('animal')
		.where('id', idAnimal)
		.update({ hasNow: true });

	  await trx('transaction_with_animal')
		.where('idAnimal', idAnimal)
		.where('idTransaction', args.id)
		.where('type', 'sale')
		.delete();
	}

	await trx.commit();

	return true;
  } catch (e) {
	throw new Error(e.message);
  }
};

const updateSale = async (_, args) => {
  try {
	const content = {...args.input};


	await connection('sale')
	.where('id', args.id)
	.update({ ...content });

	let item = await connection('sale')
	.where('id', args.id)
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