const connection = require('../../database/connection');

const { authorizationUserIsAdmin, authorizationUserIsAdminOrIsOwn } = require('../../auth/utils/verifyUserAuthenticate');
const { cursorEncoding, cursorDecoding } = require('../../utils/cursorEncodingAndDecoding');

const users = async (_, args, context) => {
	try {
		authorizationUserIsAdmin(context);
		
		const limitPage = args.limit || 10,
			cursor = cursorDecoding(args.cursor);
		
		let pageInfo = {
			endCursor: null,
			hasNextPage: false
		}

		const { totalCount } = await connection('user')
			.count({totalCount: '*'})
			.first();
		
		const usersList = await connection('user')
			.where('id', '>', cursor)
			.limit(limitPage + 1);

		let amountItens = usersList.length;
		pageInfo.hasNextPage = amountItens > limitPage;

		const edges = usersList.slice(0, limitPage).map(item => {
			let cursor = cursorEncoding(item.id);
			pageInfo.endCursor = cursor;

			return { node: item, cursor }
		})

		return {
			pageInfo,
			totalCount,
			edges
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