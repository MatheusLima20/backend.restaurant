import { celebrate, Joi, Segments } from "celebrate";
import { messages } from 'joi-translation-pt-br';

export const PlatformValidation = {

    get: celebrate({

        [Segments.BODY]: {
            cnpj: Joi.string().required()
        }

    }, { abortEarly: false, messages: messages, }),

}