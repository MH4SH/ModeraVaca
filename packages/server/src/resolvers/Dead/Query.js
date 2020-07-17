const connection = require('../../database/connection');
const { authorizationUserHasFarm } = require('../../auth/utils/verifyUserAuthenticate');

const pageInfo = {
	endCursor: "CURSOR NÃO ARRUMADO",
	hasNextPage: true
}


const deads = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm;

		const current = "CURSOR NÃO ARRUMADO";
		
		const deadList = await connection('dead')
			.where({idFarm});
		
		return {
		pageInfo,
		edges: deadList.map(item => ({ node: item, cursor: current })),
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