const connection = require('../../database/connection');

const bornList = [
  {id: 1, gender: 'f', age: 1, idBreeds: 1, amount: 12},
  {id: 2, gender: 'f', age: 2, idBreeds: 1, amount: 22},
  {id: 3, gender: 'f', age: 3, idBreeds: 1, amount: 11},
  {id: 4, gender: 'f', age: 4, idBreeds: 1, amount: 14},
  {id: 5, gender: 'f', age: 2, idBreeds: 2, amount: 2},
  {id: 6, gender: 'f', age: 1, idBreeds: 2, amount: 22},
  {id: 7, gender: 'f', age: 3, idBreeds: 2, amount: 23},
  {id: 8, gender: 'f', age: 4, idBreeds: 2, amount: 44},
  {id: 9, gender: 'f', age: 6, idBreeds: 2, amount: 11},
  {id: 10, gender: 'm', age: 7, idBreeds: 1, amount: 1}
];

const createBorn = async (_, args) => {
  try {
    const trx = await connection.transaction();
    const data = args.input;


    const [bornId] = await trx('born').insert({
      ...data,
      idFarm: args.idFarm,
      created: new Date()
    });

    for(let v = 0; v < data.amount; v++){
      let [idAnimal] = await trx('animal').insert({
        idBreeds: data.idBreeds,
        gender: data.gender,
        dateBorn: data.dateBorn,
        idFarm: args.idFarm,
        type: 'born',
        created: new Date()
      });


      await trx('transaction_with_animal').insert({
        idAnimal,
        idTransaction: bornId,
        type: 'born'
      });
    }

    await trx.commit();

    return {
      id: bornId,
      ...data
      };
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteBorn = async (_, args) => {
  try {
    let listAnimals = await connection('transaction_with_animal')
    .where('idTransaction', args.id)
    .where('type', 'born');

    let {amountCreated} = await connection('transaction_with_animal')
    .where({'idTransaction': args.id, type: 'dead'})
    .orWhere({'idTransaction': args.id, type: 'born'})
    .count({amountCreated: 'id'})
    .first();
    
    if(!args.force)
      if(amountCreated!=0)
        throw new Error(JSON.stringify({status: "Need Force", number: amountCreated}));

    if(listAnimals.length===0)
      return false;

    const trx = await connection.transaction();

    await trx('born')
    .where('id', args.id)
    .delete();

    for(let {idAnimal} of listAnimals){

      await trx('animal')
      .where('id', idAnimal)
      .delete();

      await trx('transaction_with_animal')
      .where('idAnimal', idAnimal)
      .where('idTransaction', args.id)
      .where('type', 'born')
      .delete();

    }

    await trx.commit();

    return true;
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateBorn = async (_, args) => {
  try {
    const content = {...args.input};


    await connection('born')
    .where('id', args.id)
    .update({ ...content });

    let item = await connection('born')
    .where('id', args.id)
    .first();

    console.log(item);
    return item;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
    createBorn,
    deleteBorn,
    updateBorn
};