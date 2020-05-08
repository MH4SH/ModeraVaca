const farmList = [
    {id: 1, name: "Fazenda 2 Coqueiros", idUser: 1},
    {id: 2, name: "Sitio Nevada", idUser: 2},
    {id: 3, name: "Sitio Ouro Verde", idUser: 2}
];

const createFarm = async (_, args) => {
  try {
    const data = farmList.find(Farm => Farm.id == 1);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteFarm = async (_, args) => {
  try {
    const data = farmList.find(Farm => Farm.id == 1);
    return false;
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateFarm = async (_, args) => {
  try {
    const data = farmList.find(Farm => Farm.id == 1);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
    createFarm,
    deleteFarm,
    updateFarm
};