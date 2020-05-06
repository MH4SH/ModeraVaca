const usersList = [
    {id: 1, name: "Marcon", email: "marcon@mh4sh.dev", age: "21"},
    {id: 2, name: "Murillo", email: "murillo@mh4sh.dev"},
    {id: 3, name: "dÉ", email: "DE@mh4sh.dev", age: "47"}
];

const createUser = async (_, args) => {
  try {
    const data = usersList.find(user => user.id == 1);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
    createUser,
};