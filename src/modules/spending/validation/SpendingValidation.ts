import { celebrate, Joi, Segments } from "celebrate";
import { messages } from 'joi-translation-pt-br';

export const SpendingValidation = {

    get: celebrate({

        [Segments.PARAMS]: {
            date: Joi.string().required(),
        }

    }, { abortEarly: false, messages: messages, }),

    store: celebrate({

        [Segments.BODY]: {
            name: Joi.string().required(),
            value: Joi.number().required().positive(),
            unitMeasurement: Joi.string().required(),
            amount: Joi.number().required().positive(),
        }

    }, { abortEarly: false, messages: messages, }),

    patch: celebrate({

        [Segments.PARAMS]: {
            id: Joi.number().required().positive(),
        },

        [Segments.BODY]: {
            name: Joi.string().required(),
            value: Joi.number().required().positive(),
            amount: Joi.number().required().positive(),
            unitMeasurement: Joi.string().allow(),
        }

    }, { abortEarly: false, messages: messages, }),

}