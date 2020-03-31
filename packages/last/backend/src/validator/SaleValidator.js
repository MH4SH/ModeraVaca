const {celebrate, Joi, Segments} = require('celebrate');

module.exports = {
    index: celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number().min(1),
            dateMin: Joi.date(),
            dataMax: Joi.date()
        })
    }),
    create: celebrate({
        [Segments.BODY]: Joi.object().keys({
            buyer: Joi.string().required(),
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