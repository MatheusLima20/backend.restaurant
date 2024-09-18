import { celebrate, Joi, Segments } from "celebrate";
import { messages } from "joi-translation-pt-br";

export const PaymentsValidation = {
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
};
