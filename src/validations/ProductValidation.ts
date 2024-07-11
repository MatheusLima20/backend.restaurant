import { celebrate, Joi, Segments } from "celebrate";
import { messages } from "joi-translation-pt-br";

export const ProductValidation = {

    get: celebrate({
        [Segments.PARAMS]: {
            isproduct: Joi.boolean().allow(),
        }
    }, { abortEarly: false, messages: messages, }),

    store: celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            value: Joi.number().positive(),
            amount: Joi.number().allow(),
            unitMeasurement: Joi.string().allow(),
            orderType: Joi.string().allow(),
            isActive: Joi.boolean().required(),
            show: Joi.boolean().required(),
            isPlate: Joi.boolean().required(),
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
            id: Joi.number().required().positive()
        },
        [Segments.BODY]: {
            name: Joi.string().allow(),
            value: Joi.number().allow(),
            amount: Joi.number().allow(),
            unitMeasurement: Joi.string().allow(),
            isActive: Joi.boolean().allow(),
            show: Joi.boolean().allow(),
            add: Joi.boolean().allow(),
            isPlate: Joi.boolean().allow(),
        }

    }, { abortEarly: false, messages: messages, }),

}
