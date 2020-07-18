const connection = require('../../database/connection');
const { authorizationUserHasFarm } = require('../../auth/utils/verifyUserAuthenticate');

const pageInfo = {
    endCursor: "CURSOR NÃO ARRUMADO",
    hasNextPage: true
}


const sales = async (_, args, context) => {
    try {
        authorizationUserHasFarm(context);

        const idFarm = context._userAuthenticate.idFarm;

        const current = "CURSOR NÃO ARRUMADO";
        
        const saleList = await connection('sale')
            .where({idFarm});

        return {
            pageInfo,
            edges: saleList.map(item => ({ node: item, cursor: current })),
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

const sale = async (_, args, context) => {
    try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm,
			idSale = args.id;

        const saleContent = await connection('sale')
            .where({id: idSale, idFarm})
            .first();

        return saleContent;
    } catch (e) {
        throw new Error(e.message);
    }
};

module.exports = {
    sales,
    sale
};