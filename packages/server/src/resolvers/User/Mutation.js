const bcrypt = require('bcryptjs');
const connection = require('../../database/connection');

const createUser = async (_, args) => {
  try {
    const {name, email, phone, password, city, uf} = args.input;

    const mh4sh = await bcrypt.hash(password, 10);
    const data = {
      type: '3',
      name,
      email,
      phone,
      city,
      uf,
    };

    const [id] = await connection('user').insert({
      ...data,
      password: mh4sh,
      created: new Date()
    });

    return {
      id,
      ...data
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteUser = async (_, args) => {
  try {
    await connection('user')
    .where('id', args.id)
    .delete();

    return true;
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateUser = async (_, args) => {
  try {
    const content = {...args.input};
    
    await connection('user').where('id', args.id).update({ ...content });
    const data = await connection('user').where('id', args.id).first();

    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
    createUser,
    deleteUser,
    updateUser
};