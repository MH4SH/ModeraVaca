const connection = require('../../database/connection');

const pageInfo = {
  endCursor: "CURSOR NÃO ARRUMADO",
  hasNextPage: true
}


const purchases = async (_, args) => {
  try {
    const current = "CURSOR NÃO ARRUMADO"
    const listPurchases = await connection('purchase');



    return {
      pageInfo,
      edges: listPurchases.map(item => ({ node: item, cursor: current })),
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const purchase = async (_, args) => {
  try {
    const data = await connection('purchase')
      .where('id', args.id)
      .first();

    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  purchases,
    purchase,
};