const DatasList = [
    {id: 1, kind: "Marcon", value: "Tipo Nelore", status: true},
    {id: 2, kind: "Murillo", value: "Tipo Pastoso", statue: true},
    {id: 3, kind: "dÉ", value: "Tipo Farmento", status: true}
];

const createData = async (_, args) => {
  try {
    const data = DatasList.find(Data => Data.id == 1);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteData = async (_, args) => {
  try {
    const data = DatasList.find(Data => Data.id == 1);
    return false;
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateData = async (_, args) => {
  try {
    const data = DatasList.find(Data => Data.id == 1);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
    createData,
    deleteData,
    updateData
};