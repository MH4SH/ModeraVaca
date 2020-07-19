const connection = require('../../database/connection');

const { authorizationUserHasFarm } = require('../../auth/utils/verifyUserAuthenticate');
const { cursorEncoding, cursorDecoding } = require('../../utils/cursorEncodingAndDecoding');

const datas = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm,
			filter = args.filter.kind ? {kind: args.filter.kind} : {},
			limitPage = args.limit || 10,
			cursor = cursorDecoding(args.cursor);
		
		let pageInfo = {
			endCursor: null,
			hasNextPage: false
		};

		const { totalCount } = await connection('data')
			.count({totalCount: '*'})
			.where({idFarm, ...filter})
			.first();

		const datasList = await connection('data')
			.where('id', '>', cursor)
			.where({idFarm, ...filter})
			.limit(limitPage + 1);

		let amountItens = datasList.length;
		pageInfo.hasNextPage = amountItens > limitPage;

		const edges = datasList.slice(0, limitPage).map(item => {
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

const data = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm
			idData = args.id;
		
		const data = await connection('data')
			.where({id: idData, idFarm})
			.first();

		return data;
	} catch (e) {
		throw new Error(e.message);
	}
};

module.exports = {
	datas,
	data,
};