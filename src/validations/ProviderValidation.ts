import { celebrate, Joi, Segments } from "celebrate";
import { messages } from 'joi-translation-pt-br';

export const ProviderValidation = {

    patchNoPay: celebrate({

        [Segments.BODY]: {
            data: Joi.array().required(),
        }

    }, { abortEarly: false, messages: messages, }),

}