const connection = require('../../database/connection');
const { authorizationUserHasFarm } = require('../../auth/utils/verifyUserAuthenticate');

const pageInfo = {
	endCursor: "CURSOR NÃO ARRUMADO",
	hasNextPage: true
}


const purchases = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm;

		const current = "CURSOR NÃO ARRUMADO"

		const listPurchases = await connection('purchase')
			.where({idFarm});

		return {
		pageInfo,
		edges: listPurchases.map(item => ({ node: item, cursor: current })),
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