const connection = require('../../database/connection');
const generateToken = require('../../auth/utils/generateToken');

const UsersType = {
    ADMIN: '1',
    MODERATOR: '2',
    CLIENT: '3'
};

const User = {
    farms: async (parent, args, context) => {
        let idUser = parent.id;
        
        let farms = await connection('farm')
        .select('id',  'name')
        .where({idUser});
        
        return farms.map(farm => ({
            ...farm,
            token: generateToken({id: context._userAuthenticate.id, phone: context._userAuthenticate.phone, email: context._userAuthenticate.email, type: context._userAuthenticate.type, farmId: `${farm.id}`})
        }))
    }
}

module.exports = {
    UsersType,
    User
};