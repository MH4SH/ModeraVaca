const bcrypt = require('bcryptjs');
const connection = require('../../database/connection');
const generateToken = require('../utils/generateToken');
const generateNumberCode = require('../../utils/generateNumberCode');

//Send email api
const sendEmail = require('../../utils/sendEmail');

//Send sms api
const sendSMS = require('../../utils/sendSMS');

const UserController = {
	register: async (req, res) => {
		const body = req.body,
			{phone, email} = body;
			try {
				if((await connection('user').where({phone}).orWhere({email})).length!==0)
					return res.status(400).json({statusCode: 400, error: "Bad Request", message: "\"user\" already in use", validation: { source: "body", keys: [ "email", "phone"]}})

				body.password = await bcrypt.hash(body.password, 10);

				const [id] = await connection('user')
				.insert({
					...body,
					type: '3'
				});

				body.password = undefined;
				return res.status(200).json({user: {id, ...body, type: '3'}, token: generateToken({id, phone, email, type: '3'})});

			} catch (err) {
				return res.status(400).json({statusCode: 400, error: 'Bad Request', message: err.message})
			}
	},
	getNewPassword: async (req, res) => {
		const {type, access} = req.body;

		try {
			const userData = await connection('user')
				.where({[type]: access})
				.first();

			if(!userData)
				return res.status(400).json({statusCode: 400, error: "Bad Request", message: `user not found with this ${type}`, validation: { source: "body", keys: ['access']}})

			let token = await bcrypt.genSalt(10);
			let code = generateNumberCode(6);

			await connection('resetPassword')
				.where('idUser', userData.id)
				.delete();

			
			await connection('resetPassword')
			.insert({
				idUser: userData.id,
				token,
				code: await bcrypt.hash(`${code}`, 10)
			});

			switch (type) {
				case 'phone':
					sendSMS.send({numberSMS: `55${access}`, message: `${code}: Seu token para redefinir a senha no ModeraVaca.`});
				break;
				case 'email':
					console.log('Email', code);
					sendEmail
						.noReplay({
							to: access,
							subject: 'Recuperar Senha',
							html: `<p>Use o código <strong>${code}</strong> para redefinir a sua senha.<br/><a href="https://moderavaca.projeto.mh4sh.dev/password#!${token}">https://moderavaca.projeto.mh4sh.dev/password#!${token}</a></p>`,
							text: `Use o código ${code} para redefinir a sua senha. \n https://moderavaca.projeto.mh4sh.dev/password#!${token}`
						});
				break;
			}

			return res.status(200).json({statusCode: 200, token})
		} catch (err) {
			return res.status(400).json({statusCode: 400, error: 'Bad Request', message: err.message})
		}

	},
	setNewPassword: async (req, res) => {
		const {token, code, password} = req.body;
		
		try {
			let resetPassword = await connection('resetPassword')
				.where({token})
				.first();
			
			if(!await bcrypt.compare(`${code}`, resetPassword.code))
				return res.status(403).json({statusCode: 403, error: "Forbidden", message: "Wrong code", validation: { source: "body", keys: [ "code"]}})
			
			let hash = await bcrypt.hash(password, 10);
			let trx = await connection.transaction();
			await trx('user')
			.where('id', resetPassword.idUser)
			.update({
				password: hash
			});

			const userData = await trx('user')
				.where('id', resetPassword.idUser)
				.first();

			
			await trx('resetPassword')
				.where('idUser', resetPassword.idUser)
				.delete();
			
			await trx.commit();

			userData.password = undefined;

			res.status(200).json({user: {...userData}, token: generateToken({id: userData.id, phone: userData.phone, email: userData.email, type: userData.type})});
		} catch(err) {
			return res.status(400).json({statusCode: 400, error: 'Bad Request', message: err.message})
		}
	},
	auth: async (req, res) => {
		const {password, access} = req.body;
		try {
			const userData = await connection('user')
				.where({email: access})
				.orWhere({phone: access})
				.first();
			
			if(!userData)
				return res.status(400).json({statusCode: 400, error: "Bad Request", message: "user not found", validation: { source: "body", keys: [ "email", "phone"]}})
			
			if(!await bcrypt.compare(password, userData.password))
				return res.status(403).json({statusCode: 403, error: "Forbidden", message: "access denied", validation: { source: "body", keys: [ "password"]}})
			
			userData.password = undefined;

			res.status(200).json({user: {...userData}, token: generateToken({id: userData.id, phone: userData.phone, email: userData.email, type: userData.type})});
		} catch (err) {
			return res.status(400).json({statusCode: 400, error: 'Bad Request', message: err.message})
		}
	}
}

module.exports = UserController;
