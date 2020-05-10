const connection = require('../../database/connection');

const createFarm = async (_, args) => {
  try {
    const {name, idUser} = args.input;

    const data = {
      name, 
      idUser
    };

    const [id] = await connection('farm').insert({
      ...data
    });

    return {
      id,
      ...data
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteFarm = async (_, args) => {
  try {
    await connection('farm')
    .where('id', args.id)
    .delete();

    return true;
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateFarm = async (_, args) => {
  try {
    const {name} = args.input;
    
    await connection('farm')
    .where('id', args.id)
    .update({ name });
    
    return {
      id: args.id,
      name
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
    createFarm,
    deleteFarm,
    updateFarm
};