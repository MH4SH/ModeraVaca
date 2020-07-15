const connection = require('../../database/connection');

const createFarm = async (_, args, context) => {
  try {
    const idUserAuthenticate =  context._userAuthenticate.id,
      {name} = args.input;

    const farmData = {
      name, 
      idUser: idUserAuthenticate
    };

    const [id] = await connection('farm').insert({
      ...farmData
    });

    return {
      id,
      ...farmData
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteFarm = async (_, args) => {
  try {
    const idUserAuthenticate =  context._userAuthenticate.id,
      requestIdFarm = args.id;

    await connection('farm')
    .where('id', requestIdFarm)
    .where('idUser', idUserAuthenticate)
    .delete();

    return true;
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateFarm = async (_, args) => {
  try {
    const idUserAuthenticate =  context._userAuthenticate.id,
      requestIdFarm = args.id,
      {name} = args.input;
    
    await connection('farm')
    .where('id', requestIdFarm)
    .where('idUser', idUserAuthenticate)
    .update({ name });
    
    return {
      id: requestIdFarm,
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