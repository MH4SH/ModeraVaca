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
    const data = bornList.find(Born => Born.id == 1);
    return false;
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateBorn = async (_, args) => {
  try {
    const data = bornList.find(Born => Born.id == 1);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
    createBorn,
    deleteBorn,
    updateBorn
};