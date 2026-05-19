import { celebrate, Joi, Segments } from "celebrate";
import { messages } from "joi-translation-pt-br";

export const ChargesValidation = {
    get: celebrate(
        {
            [Segments.PARAMS]: {
                type: Joi.string().required(),
            },
        },
        { abortEarly: false, messages: messages }
    ),

    paymentPlatformCreditCard: celebrate(
        {
            [Segments.BODY]: {
                name: Joi.string().required(),
                clientInstallments: Joi.number().required(),
                paymentToken: Joi.string().required(),
            },
        },
        { abortEarly: false, messages: messages }
    ),

    store: celebrate(
        {
            [Segments.BODY]: {
                type: Joi.string().required(),
                value: Joi.number().required().positive(),
                payer: Joi.string().allow(),
                description: Joi.string().required(),
                isPay: Joi.boolean().allow(),
                boxdayId: Joi.number().required().positive(),
            },
        },
        { abortEarly: false, messages: messages }
    ),
};
