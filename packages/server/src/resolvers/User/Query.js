const connection = require('../../database/connection');
const { authorizationUserIsAdmin, authorizationUserIsAdminOrIsOwn } = require('../../auth/utils/verifyUserAuthenticate');

const pageInfo = {
    endCursor: "CURSOR NÃO ARRUMADO",
    hasNextPage: true
}


const users = async (_, args, context) => {
    try {
        authorizationUserIsAdmin(context);

        const current = "CURSOR NÃO ARRUMADO";
        const usersList = await connection('user');
        return {
            pageInfo,
            edges: usersList.map(item => ({ node: item, cursor: current })),
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

const user = async (_, args, context) => {
    try {
        let requestIdUser = args.id;

        authorizationUserIsAdminOrIsOwn(context, requestIdUser);

        const userContent = await connection('user')
            .where('id', requestIdUser)
            .first();

        return userContent;
    } catch (e) {
        throw new Error(e.message);
    }
};

module.exports = {
    users,
    user,
};