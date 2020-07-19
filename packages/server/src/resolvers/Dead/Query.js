const connection = require('../../database/connection');

const { authorizationUserHasFarm } = require('../../auth/utils/verifyUserAuthenticate');
const { cursorEncoding, cursorDecoding } = require('../../utils/cursorEncodingAndDecoding');

const deads = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm,
			limitPage = args.limit || 10,
			cursor = cursorDecoding(args.cursor);

		let pageInfo = {
			endCursor: null,
			hasNextPage: false
		}

		const { totalCount } = await connection('dead')
			.where({idFarm})
			.count({totalCount: '*'})
			.first();

		const deadList = await connection('dead')
			.where('id', '>', cursor)
			.where({idFarm})
			.limit(limitPage + 1);

		let amountItens = deadList.length;
		pageInfo.hasNextPage = amountItens > limitPage;

		const edges = deadList.slice(0, limitPage).map(item => {
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

const dead = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm,
			idDead = args.id;

		const deadContent = await connection('dead')
		.where({id: idDead, idFarm})
		.first();
		
		return deadContent;
	} catch (e) {
		throw new Error(e.message);
	}
};

module.exports = {
	deads,
	dead
};