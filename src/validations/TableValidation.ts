import { celebrate, Joi, Segments } from "celebrate";
import { messages } from "joi-translation-pt-br";

export const TableValidation = {

    get: celebrate({
        [Segments.PARAMS]: {
            orderId: Joi.number().positive().required(),
        }
    }, { abortEarly: false, messages: messages, }),

    store: celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            value: Joi.number().positive(),
            amount: Joi.number().allow(),
            unitMeasurement: Joi.string().required(),
            isActive: Joi.boolean().required(),
            show: Joi.boolean().required(),
        }
    }, { abortEarly: false, messages: messages, }),

    stores: celebrate({
        [Segments.BODY]: {
            data: Joi.array().items({
                orderId: Joi.number().required().positive(),
                status: Joi.string().required(),
            }).required(),
        }
    }, { abortEarly: false, messages: messages, }),

    patch: celebrate({

        [Segments.PARAMS]: {
            id: Joi.number().required().positive(),
            isActive: Joi.boolean().allow(),
            name: Joi.string().allow(),
        },

    }, { abortEarly: false, messages: messages, }),

}
