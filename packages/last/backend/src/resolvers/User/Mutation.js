const bcrypt = require('bcryptjs');

const usersList = [
    {id: 1, name: "Marcon", email: "marcon@mh4sh.dev", age: "21"},
    {id: 2, name: "Murillo", email: "murillo@mh4sh.dev"},
    {id: 3, name: "dÉ", email: "DE@mh4sh.dev", age: "47"}
];

const connection = require('../../database/connection');

const createUser = async (_, args) => {
  try {
    const {name, email, phone, password, city, uf} = args.input;

    const mh4sh = await bcrypt.hash(password, 10);
    

    const [id] = await connection('users').insert({
      type: 3,
      name,
      email,
      phone,
      password: mh4sh,
      city,
      uf,
      created: new Date()
    });

    return {
      id,
      type: 3,
      name,
      email,
      phone,
      city,
      uf
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteUser = async (_, args) => {
  try {
    const data = usersList.find(user => user.id == 1);
    return false;
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateUser = async (_, args) => {
  try {
    const data = usersList.find(user => user.id == 1);
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