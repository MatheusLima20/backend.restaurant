import { celebrate, Joi, Segments } from "celebrate";
import { messages } from "joi-translation-pt-br";

export const ProductValidation = {

    get: celebrate({
        [Segments.PARAMS]: {
            orderId: Joi.number().positive().required(),
        }
    }, { abortEarly: false, messages: messages, }),

    store: celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            value: Joi.number().positive(),
            amount: Joi.string().allow(),
            unitMeasurement: Joi.number().required().positive(),
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

        [Segments.BODY]: {

        }

    }, { abortEarly: false, messages: messages, }),

}
