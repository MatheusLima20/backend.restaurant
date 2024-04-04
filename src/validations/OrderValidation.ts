import { celebrate, Joi, Segments } from "celebrate";
import { messages } from 'joi-translation-pt-br';

export const OrderValidation = {

    getByIsDeliveredAndIsCancelled: celebrate({
        [Segments.PARAMS]: {
            isDelivered: Joi.boolean().required(),
            isCancelled: Joi.boolean().required(),
        }
    }, { abortEarly: false, messages: messages, }),

    getByTrankingCode: celebrate({
        [Segments.PARAMS]: {
            trackingCode: Joi.string().required(),
            companycnpj: Joi.string().required(),
        }
    }, { abortEarly: false, messages: messages, }),

    getById: celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required(),
        }
    }, { abortEarly: false, messages: messages, }),

    store: celebrate({
        [Segments.BODY]: {
            description: Joi.string().required().min(10),
            finalClientId: Joi.number().required().positive(),
        }
    }, { abortEarly: false, messages: messages, }),

    patch: celebrate({

        [Segments.BODY]: {
            orderId: Joi.number().required().positive(),
            deliveryId: Joi.number().allow().positive(),
            deliveryForecast: Joi.date().allow(),
            value: Joi.number().required().positive(),
            orderStatusId: Joi.number().required().positive(),
            finalClientId: Joi.number().positive().allow(),
            description: Joi.string().allow(),
        }

    }, { abortEarly: false, messages: messages, }),

    patchDelivered: celebrate({

        [Segments.BODY]: {
            id: Joi.number().required().positive(),
            costumerId: Joi.number().required().positive(),
        }

    }, { abortEarly: false, messages: messages, }),

}