const connection = require('../../database/connection');

const { authorizationUserHasFarm } = require('../../auth/utils/verifyUserAuthenticate');

const createData = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm,
		{kind, value} = args.input;

		const data = {
			kind,
			value,
			idFarm
		};

		const [id] = await connection('data').insert({
			...data,
			idFarm
		});

		return {
			id,
			...data,
			status: true,
			idFarm
		};
	} catch (e) {
		throw new Error(e.message);
	}
};

const deleteData = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm,
			idData = args.id;

		const response = await connection('data')
			.where('id', idData)
			.where('idFarm', idFarm)
			.delete();

		console.log(response)

		return true;
	} catch (e) {
		throw new Error(e.message);
	}
};

const updateData = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm,
			idData = args.id,
			content = {...args.input};
		
		const response = await connection('data')
			.where('id', idData)
			.where('idFarm', idFarm)
			.update({ ...content });

			console.log(response);

		const data = await connection('data')
			.where('id', idData)
			.where('idFarm', idFarm)
			.first();

		return data;
	} catch (e) {
		throw new Error(e.message);
	}
};

module.exports = {
    createData,
    deleteData,
    updateData
};