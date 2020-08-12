const connection = require('../../database/connection');

const pageInfo = {
  endCursor: "CURSOR NÃO ARRUMADO",
  hasNextPage: true
}


const cards = async (_, args) => {
  try {
    const current = "CURSOR NÃO ARRUMADO";
    const cardsList = await connection('card');
    return {
      pageInfo,
      edges: cardsList.map(item => {
        item.date = item.date / 1000;
        item.created = item.created / 1000;
        return { node: item, cursor: current }
      }),
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const card = async (_, args) => {
  try {
    const data = await connection('card')
    .where('id', args.id)
    .first();

    data.date = data.date /1000;
    data.created = data.created /1000;

    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
    cards,
    card,
};