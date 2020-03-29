
const {celebrate, Joi, Segments} = require('celebrate');

module.exports = {
    register: celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            user: Joi.string().required(),
            pass: Joi.string().required(),
        })
    }),
    auth: celebrate({
        [Segments.BODY]: Joi.object().keys({
            user: Joi.string().required(),
            pass: Joi.string().required()
        })
    }),
}