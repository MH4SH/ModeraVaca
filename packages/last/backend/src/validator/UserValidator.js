
const {celebrate, Joi, Segments} = require('celebrate');

module.exports = {
    index: celebrate({
        [Segments.BODY]: Joi.object().keys({
            page: Joi.string().required()
        })
    }),
    register: celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().email().required(),
            phone: Joi.number().required(),
            name: Joi.string().required(),
            city: Joi.string().required(),
            uf: Joi.string().required(),
            pass: Joi.string().required()
        })
    }),
    auth: celebrate({
        [Segments.BODY]: Joi.object().keys({
            access: Joi.string().required(),
            pass: Joi.string().required()
        })
    }),
}