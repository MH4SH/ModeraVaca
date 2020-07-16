const connection = require('../../database/connection');
const generateToken = require('../../auth/utils/generateToken');

const createFarm = async (_, args, context) => {
    try {
        const idUserAuthenticate = context._userAuthenticate.id,
            { name } = args.input;

        const farmData = {
            name,
            idUser: idUserAuthenticate
        };

        const [id] = await connection('farm').insert({
            ...farmData
        });

        return {
            id,
            ...farmData,
            token: generateToken({ id: context._userAuthenticate.id, phone: context._userAuthenticate.phone, email: context._userAuthenticate.email, type: context._userAuthenticate.type, idFarm: id })
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

const deleteFarm = async (_, args, context) => {
    try {
        const idUserAuthenticate = context._userAuthenticate.id,
            requestIdFarm = args.id;

        const isFarmDeleted = await connection('farm')
            .where('id', requestIdFarm)
            .where('idUser', idUserAuthenticate)
            .delete();


        return isFarmDeleted;
    } catch (e) {
        throw new Error(e.message);
    }
};

const updateFarm = async (_, args, context) => {
    try {
        const idUserAuthenticate = context._userAuthenticate.id,
            requestIdFarm = args.id,
            { name } = args.input;

        const isUpdated = await connection('farm')
            .where('id', requestIdFarm)
            .where('idUser', idUserAuthenticate)
            .update({ name });

        if(!isUpdated)
            throw new Error(`Farm don't found`);

        return {
            id: requestIdFarm,
            name,
            token: generateToken({ id: context._userAuthenticate.id, phone: context._userAuthenticate.phone, email: context._userAuthenticate.email, type: context._userAuthenticate.type, idFarm: requestIdFarm })
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

module.exports = {
    createFarm,
    deleteFarm,
    updateFarm
};