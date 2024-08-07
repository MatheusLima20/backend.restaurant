import { celebrate, Joi, Segments, } from "celebrate";
import { messages } from "joi-translation-pt-br";

export const RawMaterialValidation = {

    get: celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().positive().required(),
        }
    }, { abortEarly: false, messages: messages, }),

    store: celebrate({
        [Segments.BODY]: {
            productId: Joi.number().positive().required(),
            rawMaterialId: Joi.number().positive().required(),
            amount: Joi.number().positive().required(),
        }
    }, { abortEarly: false, messages: messages }),

    patch: celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().positive().required()
        },

        [Segments.BODY]: {
            productId: Joi.number().positive().required(),
            rawMaterialId: Joi.number().positive().required(),
            amount: Joi.number().positive().required(),
        }
    }, { abortEarly: false, messages: messages }),

    delete: celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().positive().required()
        },
    }, { abortEarly: false, messages: messages }),


}
