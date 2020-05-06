const usersList = [
    {id: 1, name: "Marcon", email: "marcon@mh4sh.dev", age: "21"},
    {id: 2, name: "Murillo", email: "murillo@mh4sh.dev"},
    {id: 3, name: "dÉ", email: "DE@mh4sh.dev", age: "47"}
];

const pageInfo = {
  endCursor: "CURSOR NÃO ARRUMADO",
  hasNextPage: true
}


const users = async (_, args) => {
  try {
    const current = "CURSOR NÃO ARRUMADO"
    return {
      pageInfo,
      edges: usersList.map(item => ({ node: item, cursor: current })),
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const user = async (_, args) => {
  try {
    const data = usersList.find(user => user.id == args.id);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
    users,
    user,
};