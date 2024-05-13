import { celebrate, Joi, Segments } from "celebrate";
import { messages } from 'joi-translation-pt-br';

export const OrderValidation = {

    getByTable: celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required().positive(),
        }
    }, { abortEarly: false, messages: messages, }),

    getByBoxDay: celebrate({
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

        [Segments.PARAMS]: {
            id: Joi.number().required().positive(),
        },

        [Segments.BODY]: {
            productId: Joi.number().allow().positive(),
            amount: Joi.number().allow(),
            isCancelled: Joi.bool().allow(),
            isOpen: Joi.bool().allow(),
            add: Joi.bool().allow(),
        }

    }, { abortEarly: false, messages: messages, }),

    patchChangeTableOrders: celebrate({

        [Segments.PARAMS]: {
            idTable1: Joi.number().required().positive(),
            idTable2: Joi.number().required().positive(),
        }

    }, { abortEarly: false, messages: messages, }),

}