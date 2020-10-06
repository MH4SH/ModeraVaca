const bcrypt = require('bcryptjs');
const connection = require('../../database/connection');

const { authorizationUserIsAdmin, authorizationUserIsAdminOrIsOwn } = require('../../auth/utils/verifyUserAuthenticate');

const createUser = async (_, args, context) => {
	try {
		authorizationUserIsAdmin(context);

		const { name, email, phone, password, city, uf } = args.input;

		const mh4sh = await bcrypt.hash(password, 10);
		const userData = {
			type: '3',
			name,
			email,
			phone,
			city,
			uf,
		};

		const [id] = await connection('user').insert({
			...userData,
			password: mh4sh
		});

		return {
			id,
			...userData
		};
	} catch (e) {
		throw new Error(e.message);
	}
};

const deleteUser = async (_, args, context) => {
	try {
		const requestIdUser = args.id;

		authorizationUserIsAdmin(context);

		await connection('user')
			.where('id', requestIdUser)
			.delete();

		return true;
	} catch (e) {
		throw new Error(e.message);
	}
};

const updateUser = async (_, args, context) => {
	try {
		const requestIdUser = args.id;

		authorizationUserIsAdminOrIsOwn(context, requestIdUser);

		const content = { ...args.input };

		await connection('user').where('id', args.id).update({ ...content });
		const data = await connection('user').where('id', args.id).first();

		return data;
	} catch (e) {
		throw new Error(e.message);
	}
};

module.exports = {
	createUser,
	deleteUser,
	updateUser
};