const farmList = [
  {id: 1, name: 'Sitio Nevada', idUser: 1}
];


const UsersType = {
  ADMIN: 1,
  MODERATOR: 2,
  CLIENT: 3
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