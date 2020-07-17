const connection = require('../../database/connection');
const { authorizationUserHasFarm } = require('../../auth/utils/verifyUserAuthenticate');

const pageInfo = {
	endCursor: "CURSOR NÃO ARRUMADO",
	hasNextPage: true
}


const births = async (_, args) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm;

		const current = "CURSOR NÃO ARRUMADO";

		const birthsList = await connection('birth')
			.where({idFarm});
		
		return {
		pageInfo,
		edges: birthsList.map(item => ({ node: item, cursor: current })),
		};
	} catch (e) {
		throw new Error(e.message);
	}
};

const birth = async (_, args) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm,
			idBirth = args.id;

		const birthContent = await connection('birth')
			.where({id: idBirth, idFarm})
			.first();

		return birthContent;
	} catch (e) {
		throw new Error(e.message);
	}
};

module.exports = {
	births,
	birth
};