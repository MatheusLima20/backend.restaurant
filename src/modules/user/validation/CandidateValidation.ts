import { celebrate, Joi, Segments, } from "celebrate";
import { messages } from "joi-translation-pt-br";

export const CandidateValidation = {

    get: celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().positive().required(),
        }
    }, { abortEarly: false, messages: messages, }),

    store: celebrate({
        [Segments.BODY]: {
            cpf: Joi.string().min(11),
            name: Joi.string().required().min(5),
            email: Joi.string().required().email(),
            phone: Joi.string().required().min(10),
            file: Joi.allow(),
            platform: Joi.number().allow(),
        }
    }, { abortEarly: false, messages: messages }),

    patch: celebrate({

        [Segments.BODY]: {

        }

    }, { abortEarly: false, messages: messages, }),

}
