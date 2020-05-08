const cadsList = [
    {id: 1, amount: 12, type: 'manual', date: 1588973303, created: 1588973303},
    {id: 2, amount: 22, type: 'sale', date: 1588973303, created: 1588973303},
    {id: 3, amount: 30, type: 'sale', date: 1588973303, created: 1588973303}
];

const pageInfo = {
  endCursor: "CURSOR NÃO ARRUMADO",
  hasNextPage: true
}


const cards = async (_, args) => {
  try {
    const current = "CURSOR NÃO ARRUMADO"
    return {
      pageInfo,
      edges: cadsList.map(item => ({ node: item, cursor: current })),
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const card = async (_, args) => {
  try {
    const data = cadsList.find(user => user.id == args.id);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
    cards,
    card,
};