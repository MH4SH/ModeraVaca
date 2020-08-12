const connection = require('../../database/connection');

const createCard = async (_, args) => {
  try {
    const {type, amount, date, items} = args.input;

    const data = {
      type, 
      amount, 
      date: new Date(date * 100),
      created: new Date()
    };


    const [id] = await connection('card').insert({
      ...data,
      idFarm: args.idFarm
    });


    items.map(async item => {
      await connection('card_item').insert({
        ...item,
        idCard: id,
        idFarm: args.idFarm
      });
    })

    return {
      id,
      ...data,
      status: true
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteCard = async (_, args) => {
  try {
    await connection('card_item')
    .where('idCard', args.id)
    .delete();

    await connection('card')
    .where('id', args.id)
    .delete();

    return true;
  } catch (e) {
    throw new Error(e.message);
  }
};

const remakeCard = async (_, args) => {
  try {
    await connection('card_item')
    .where('idCard', args.id)
    .delete();

    await connection('card')
    .where('id', args.id)
    .delete();


    const {amount, date} = args.input;

    const data = {
      type: "manual", 
      amount, 
      date,
      created: new Date()
    };

    const [id] = await connection('card').insert({
      ...data,
      idFarm: args.idFarm
    });

    return {
      id,
      ...data,
      status: true
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
    createCard,
    deleteCard,
    remakeCard
};