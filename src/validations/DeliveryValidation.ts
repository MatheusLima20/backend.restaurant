import { celebrate, Joi, Segments } from "celebrate";
import { messages } from 'joi-translation-pt-br';

export const DeliveryValidation = {

    get: celebrate({
        [Segments.PARAMS]: {
            inOpen: Joi.boolean().required(),
        }
    }, { abortEarly: false, messages: messages, }),

    store: celebrate({
        [Segments.BODY]: {
            id: Joi.number().required().positive(),
        }
    }, { abortEarly: false, messages: messages, }),

    patch: celebrate({
        [Segments.BODY]: {
            id: Joi.number().required().positive(),
            deliverymanId: Joi.number().positive().allow(),
            inOpen: Joi.boolean().allow(),
            isFinished: Joi.boolean().allow(),
        }
    }, { abortEarly: false, messages: messages, }),

}