const connection = require('../../database/connection');

const { authorizationUserHasFarm } = require('../../auth/utils/verifyUserAuthenticate');

const pageInfo = {
	endCursor: "CURSOR NÃO ARRUMADO",
	hasNextPage: true
}


const datas = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);
		
		const idFarm = context._userAuthenticate.idFarm;

		const current = "CURSOR NÃO ARRUMADO";

		const datasList = await connection('data')
			.where('idFarm', idFarm);

		return {
			pageInfo,
			edges: datasList.map(item => ({ node: item, cursor: current })),
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