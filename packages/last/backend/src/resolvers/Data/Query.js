const connection = require('../../database/connection');

const pageInfo = {
  endCursor: "CURSOR NÃO ARRUMADO",
  hasNextPage: true
}


const datas = async (_, args) => {
  try {
    const current = "CURSOR NÃO ARRUMADO";
    const datasList = await connection('data');
    return {
      pageInfo,
      edges: datasList.map(item => ({ node: item, cursor: current })),
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const data = async (_, args) => {
  try {
    const data = await connection('data')
    .where('id', args.id)
    .first();
    
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
    datas,
    data,
};