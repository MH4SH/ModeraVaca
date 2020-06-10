const connection = require('../../database/connection');

const createData = async (_, args) => {
  try {
    const {kind, value} = args.input;

    const data = {
      kind,
      value
    };

    const [id] = await connection('data').insert({
      ...data,
      idFarm: args.idFarm
    });

    return {
      id,
      ...data,
      status: true,
      idFarm: args.idFarm
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteData = async (_, args) => {
  try {
    await connection('data')
    .where('id', args.id)
    .delete();

    return true;
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateData = async (_, args) => {
  try {
    const content = {...args.input};
    
    await connection('data')
    .where('id', args.id)
    .update({ ...content });

    const data = await connection('data')
    .where('id', args.id)
    .first();

    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
    createData,
    deleteData,
    updateData
};