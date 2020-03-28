const {celebrate, Joi, Segments} = require('celebrate');

module.exports = {
    create: celebrate({
        [Segments.BODY]: Joi.object().keys({
            kind: Joi.string().valid(...['salesman', 'breed', 'buyer']).required(),
            number: Joi.number().required(),
            value: Joi.string().required()
        })
    }),
    update: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            _id: Joi.string().required()
        }),
        [Segments.BODY]: Joi.object().keys({
            value: Joi.string().required()
        })
    }),
    updateStatus: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            _id: Joi.string().required()
        }),
        [Segments.BODY]: Joi.object().keys({
            status: Joi.boolean().required()
        })
    })    
};