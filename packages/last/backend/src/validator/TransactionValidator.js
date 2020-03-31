const {celebrate, Joi, Segments} = require('celebrate');

module.exports = {
    index: celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number().min(1),
            dateMin: Joi.date(),
            dataMax: Joi.date()
        })
    })
}