const {celebrate, Joi, Segments} = require('celebrate');

module.exports = {
    create: celebrate({
        [Segments.BODY]: Joi.object().keys({
            buyer: Joi.string().valid(...['sale']).required(),
            purchase: Joi.string().required(),
            date: Joi.date().required(),
            amount: Joi.number().required(),
            cattle: Joi.array().required()
        })
    }),
    delete: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            _id: Joi.string().required()
        })
    })
}