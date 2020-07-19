const connection = require('../../database/connection');

const { authorizationUserHasFarm } = require('../../auth/utils/verifyUserAuthenticate');
const { cursorEncoding, cursorDecoding } = require('../../utils/cursorEncodingAndDecoding');

const purchases = async (_, args, context) => {
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

		const { totalCount } = await connection('purchase')
			.count({totalCount: '*'})
			.where({idFarm, ...filter})
			.first();

		const purchaseList = await connection('purchase')
			.where('id', '>', cursor)
			.where({idFarm, ...filter})
			.limit(limitPage + 1);

		let amountItens = purchaseList.length;
		pageInfo.hasNextPage = amountItens > limitPage;

		const edges = purchaseList.slice(0, limitPage).map(item => {
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

const purchase = async (_, args, context) => {
  try {
	authorizationUserHasFarm(context);

	const idFarm = context._userAuthenticate.idFarm,
		idPurchase = args.id;

	const purchaseContent = await connection('purchase')
	  .where({id: idPurchase, idFarm})
	  .first();

	return purchaseContent;
  } catch (e) {
	throw new Error(e.message);
  }
};

module.exports = {
	purchases,
	purchase,
};