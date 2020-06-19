const connection = require('../../database/connection');

const saleList = [
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

    const [saleId] = await trx('dead').insert({
      ...data,
      idFarm: args.idFarm,
      created: new Date()
    });


    for(let v = 0; v < amount; v++){
      let idAnimal = listAnimals[v];
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
    const data = saleList.find(Sale => Sale.id == 1);
    return false;
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateSale = async (_, args) => {
  try {
    const data = saleList.find(Sale => Sale.id == 1);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
    createSale,
    deleteSale,
    updateSale
};