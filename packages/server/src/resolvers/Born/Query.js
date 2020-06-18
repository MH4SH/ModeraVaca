const connection = require('../../database/connection');

const pageInfo = {
  endCursor: "CURSOR NÃO ARRUMADO",
  hasNextPage: true
}


const borns = async (_, args) => {
  try {
    const current = "CURSOR NÃO ARRUMADO";
    const listBorns = await connection('born');


    
    return {
      pageInfo,
      edges: listBorns.map(item => ({ node: item, cursor: current })),
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const born = async (_, args) => {
  try {
    const data = await connection('born')
      .where('id', args.id)
      .first();
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  borns,
  born
};