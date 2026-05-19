import { celebrate, Joi, Segments } from "celebrate";
import { messages } from "joi-translation-pt-br";

export const ProfileValidation = {
    getByUserId: celebrate(
        {
            [Segments.PARAMS]: {
                userId: Joi.number().required().positive(),
            },
        },
        { abortEarly: false, messages: messages }
    ),
};
