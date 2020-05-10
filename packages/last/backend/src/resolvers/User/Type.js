const farmList = [
  {id: 1, name: "Fazenda 2 Coqueiros", idUser: 1},
  {id: 2, name: "Sitio Nevada", idUser: 3},
  {id: 3, name: "Sitio Ouro Verde", idUser: 3}
];


const UsersType = {
  ADMIN: '1',
  MODERATOR: '2',
  CLIENT: '3'
};

const User = {
  farms: (obj, args) => {
      return farmList.filter(element => element.idUser === obj.id)
  }
}

module.exports = {
    UsersType,
    User

};