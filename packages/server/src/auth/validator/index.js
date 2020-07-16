const {celebrate, Joi, Segments} = require('celebrate');

module.exports = {
	register: celebrate({
		[Segments.BODY]: Joi.object().keys({
			email: Joi.string().email().required(),
			phone: Joi.number().required(),
			name: Joi.string().required(),
			city: Joi.string().required(),
			uf: Joi.string().required(),
			password: Joi.string().required()
		})
	}),
	auth: celebrate({
		[Segments.BODY]: Joi.object().keys({
			access: Joi.string().required(),
			password: Joi.string().required()
		})
	}),
	getNewPassword: celebrate({
		[Segments.BODY]: Joi.object().keys({
			access: Joi.string().required(),
			type: Joi.string().valid('phone', 'email').required()
		})
	}),
	setNewPassword: celebrate({
		[Segments.BODY]: Joi.object().keys({
			token: Joi.string().required(),
			code: Joi.number().required(),
			password: Joi.string().required()
		})
	}),
}