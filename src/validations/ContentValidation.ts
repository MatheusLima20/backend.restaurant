import { celebrate, Joi, Segments, } from "celebrate";
import { messages } from "joi-translation-pt-br";

export const ContentValidation = {

    get: celebrate({
        [Segments.PARAMS]: {
            date: Joi.string().required(),
        }
    }, { abortEarly: false, messages: messages, }),

    getByArticle: celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required(),
        }
    }, { abortEarly: false, messages: messages, }),

    store: celebrate({
        [Segments.BODY]: {
            title: Joi.string().allow(),
            subTitle: Joi.string().allow(),
            text: Joi.string().allow(),
            url: Joi.string().allow(),
            image: Joi.string().allow(),
            visible: Joi.boolean().allow(),
            file: Joi.allow(),
            path: Joi.allow(),
            tag: Joi.string().allow(),
            contentType: Joi.string().required(),
        }
    }, { abortEarly: false, messages: messages }),

    patch: celebrate({

        [Segments.PARAMS]: {
            id: Joi.number().positive()
        },

        [Segments.BODY]: {
            title: Joi.string().allow(),
            subTitle: Joi.string().allow(),
            text: Joi.string().allow(),
            url: Joi.string().allow(),
            image: Joi.string().allow(),
            file: Joi.allow(),
            path: Joi.allow(),
            tag: Joi.string().allow(),
            visible: Joi.boolean().allow(),
            contentType: Joi.string().required(),
        },
    }, { abortEarly: false, messages: messages, }),

    patchViewsAmount: celebrate({

        [Segments.PARAMS]: {
            id: Joi.number().positive()
        },
    }, { abortEarly: false, messages: messages, }),

    delete: celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().positive().required(),
        }
    }, { abortEarly: false, messages: messages, }),

}
