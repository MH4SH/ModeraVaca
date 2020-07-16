const connection = require("../../database/connection");

const createPurchase = async (_, args) => {
  try {
	const trx = await connection.transaction();
	const data = args.input;

	const [purchaseId] = await trx('purchase').insert({
	  ...data,
	  idFarm: args.idFarm,
	  created: new Date()
	})


	for(let v = 0; v < data.amount; v++){
	  let [idAnimal] = await trx('animal').insert({
		idBreeds: data.idBreeds,
		gender: data.gender,
		dateBorn: data.dateBorn,
		idFarm: args.idFarm,
		type: 'purchase',
		created: new Date()
	  });


	  await trx('transaction_with_animal').insert({
		idAnimal,
		idTransaction: purchaseId,
		type: 'purchase'
	  });
	}

	await trx.commit();

	return {
	  id: purchaseId,
	  ...data
	  };
  } catch (e) {
	throw new Error(e.message);
  }
};

const deletePurchase = async (_, args) => {
  try {
	let listAnimals = await connection('transaction_with_animal')
	.where('idTransaction', args.id)
	.where('type', 'purchase');
	
	let {amountCreated} = await connection('transaction_with_animal')
	.where({'idTransaction': args.id, type: 'dead'})
	.orWhere({'idTransaction': args.id, type: 'sale'})
	.count({amountCreated: 'id'})
	.first();
	
	if(!args.force)
	  if(amountCreated!=0)
		throw new Error(JSON.stringify({status: "Need Force", number: amountCreated}));

	if(listAnimals.length===0)
	  return false;

	const trx = await connection.transaction();

	await trx('purchase')
	.where('id', args.id)
	.delete();

	for(let {idAnimal} of listAnimals){

	  await trx('animal')
	  .where('id', idAnimal)
	  .delete();

	  await trx('transaction_with_animal')
	  .where('idAnimal', idAnimal)
	  .where('idTransaction', args.id)
	  .where('type', 'purchase')
	  .delete();

	}

	await trx.commit();

	return true;
  } catch (e) {
	throw new Error(e.message);
  }
};

const updatePurchase = async (_, args) => {
  try {
	const content = {...args.input};


	await connection('purchase')
	.where('id', args.id)
	.update({ ...content });

	let item = await connection('purchase')
	.where('id', args.id)
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