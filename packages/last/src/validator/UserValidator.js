
const {celebrate, Joi, Segments} = require('celebrate');

module.exports = {
    register: celebrate({
        [Segments.BODY]: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            user: Joi.string().required(),
            pass: Joi.string().required(),
        })
    }),
    authenticate: celebrate({
        [Segments.BODY]: Joi.object({
            user: Joi.string().required(),
            pass: Joi.string().required()
        })
    }),
}