const {celebrate, Joi, Segments} = require('celebrate');

module.exports = {
    index: celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number().min(1),
            dateMin: Joi.date(),
            dateMax: Joi.date()
        })
    }),
    createManual: celebrate({
        [Segments.BODY]: Joi.object().keys({
            breed: Joi.string().required(),
            bread_name: Joi.string().required(),
            cattle: Joi.array().required(),
            amount: Joi.number().required(),
            date: Joi.date().required()
        })
    })
};