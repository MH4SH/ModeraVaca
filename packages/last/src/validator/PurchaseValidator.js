const {celebrate, Joi, Segments} = require('celebrate');

module.exports = {
    create: celebrate({
        [Segments.BODY]: Joi.object().keys({
            salesman: Joi.string().required(),
            breed: Joi.string().required(),
            sexo: Joi.string().valid(...['f', 'm']).required(),
            date: Joi.date().required(),
            birth: Joi.date().required(),
            amount: Joi.number().required(),
            head_price: Joi.number().required(),
            freight: Joi.number().required()
        })
    }),
    update: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            _id: Joi.string().required()
        }),
        [Segments.BODY]: Joi.object().keys({
            salesman: Joi.string(),
            breed: Joi.string(),
            sexo: Joi.string().valid(...['f', 'm']),
            date: Joi.date(),
            birth: Joi.date(),
            amount: Joi.number(),
            head_price: Joi.number(),
            freight: Joi.number()
        })
    }),
    delete: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            _id: Joi.string().required()
        })
    })
};