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
}