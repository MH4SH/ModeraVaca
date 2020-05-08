const CardsList = [
    {id: 1, name: "Marcon", email: "marcon@mh4sh.dev", age: "21"},
    {id: 2, name: "Murillo", email: "murillo@mh4sh.dev"},
    {id: 3, name: "dÉ", email: "DE@mh4sh.dev", age: "47"}
];

const createCard = async (_, args) => {
  try {
    const data = CardsList.find(Card => Card.id == 1);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteCard = async (_, args) => {
  try {
    const data = CardsList.find(Card => Card.id == 1);
    return false;
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateCard = async (_, args) => {
  try {
    const data = CardsList.find(Card => Card.id == 1);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
    createCard,
    deleteCard,
    updateCard
};