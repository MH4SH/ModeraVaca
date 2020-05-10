const connection = require('../../database/connection');

const pageInfo = {
  endCursor: "CURSOR NÃO ARRUMADO",
  hasNextPage: true
}


const users = async (_, args) => {
  try {
    const current = "CURSOR NÃO ARRUMADO";
    const usersList = await connection('users');
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
    const data = await connection('users')
    .where('id', args.id)
    .first();
    
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
    users,
    user,
};