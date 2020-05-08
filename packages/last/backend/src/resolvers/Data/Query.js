const DatasList = [
  {id: 1, kind: "Marcon", value: "Tipo Nelore", status: false},
  {id: 2, kind: "Murillo", value: "Tipo Pastoso", status: true},
  {id: 3, kind: "dÉ", value: "Tipo Farmento", status: false}
];

const pageInfo = {
  endCursor: "CURSOR NÃO ARRUMADO",
  hasNextPage: true
}


const datas = async (_, args) => {
  try {
    const current = "CURSOR NÃO ARRUMADO"
    return {
      pageInfo,
      edges: DatasList.map(item => ({ node: item, cursor: current })),
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const data = async (_, args) => {
  try {
    const data = DatasList.find(user => user.id == args.id);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
    datas,
    data,
};