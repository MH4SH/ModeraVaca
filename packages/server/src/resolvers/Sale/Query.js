const connection = require('../../database/connection');

const { authorizationUserHasFarm } = require('../../auth/utils/verifyUserAuthenticate');
const { cursorEncoding, cursorDecoding } = require('../../utils/cursorEncodingAndDecoding');

const sales = async (_, args, context) => {
    try {
        authorizationUserHasFarm(context);

        const idFarm = context._userAuthenticate.idFarm,
            filter = args.filter ? {...args.filter} : {},
            limitPage = args.limit || 10,
            cursor = cursorDecoding(args.cursor);

        let pageInfo = {
            endCursor: null,
            hasNextPage: false
        }

        const { totalCount } = await connection('sale')
            .count({totalCount: '*'})
            .where({idFarm, ...filter})
            .first();

        const saleList = await connection('sale')
            .where('id', '>', cursor)
            .where({idFarm, ...filter})
            .limit(limitPage + 1);
            
        let amountItens = saleList.length;
        pageInfo.hasNextPage = amountItens > limitPage;

        const edges = saleList.slice(0, limitPage).map(item => {
            let cursor = cursorEncoding(item.id);
            pageInfo.endCursor = cursor;

            return { node: item, cursor }
        });

        return {
            pageInfo,
            totalCount,
            edges
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