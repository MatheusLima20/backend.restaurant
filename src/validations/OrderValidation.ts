import { celebrate, Joi, Segments } from "celebrate";
import { messages } from 'joi-translation-pt-br';

export const OrderValidation = {

    getByTable: celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required().positive(),
        }
    }, { abortEarly: false, messages: messages, }),

    store: celebrate({
        [Segments.BODY]: {
            idProduct: Joi.number().required().positive(),
            idTable: Joi.number().required().positive(),
            amount: Joi.number().required().positive(),
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