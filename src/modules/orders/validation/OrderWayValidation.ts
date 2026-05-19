import { celebrate, Joi, Segments } from "celebrate";
import { messages } from "joi-translation-pt-br";

export const OrderWayValidation = {

    get: celebrate({
        [Segments.PARAMS]: {
            orderId: Joi.number().positive().required(),
        }
    }, { abortEarly: false, messages: messages, }),

    store: celebrate({
        [Segments.BODY]: {
            orderId: Joi.number().required().positive(),
            status: Joi.string().required(),
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
