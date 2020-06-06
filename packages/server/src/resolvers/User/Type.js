const connection = require('../../database/connection');

const UsersType = {
  ADMIN: '1',
  MODERATOR: '2',
  CLIENT: '3'
};

const User = {
  farms: async (obj, args) => {
      return await connection('farm')
      .select('id',  'name')
      .where('idUser', obj.id);
  }
}

module.exports = {
    UsersType,
    User
};