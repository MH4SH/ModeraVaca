const connection = require('../../database/connection');

const bornList = [
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

const pageInfo = {
  endCursor: "CURSOR NÃO ARRUMADO",
  hasNextPage: true
}


const deads = async (_, args) => {
  try {
    const current = "CURSOR NÃO ARRUMADO";
    const listDeads = await connection('dead');
    return {
      pageInfo,
      edges: listDeads.map(item => ({ node: item, cursor: current })),
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const dead = async (_, args) => {
  try {
    const data = await connection('dead')
      .where('id', args.id)
      .first();
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  deads,
  dead
};