import { celebrate, Joi, Segments } from "celebrate";
import { messages } from 'joi-translation-pt-br';

export const UserValidation = {

    get: celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().positive().required(),
        }
    }, { abortEarly: false, messages: messages, }),

    getUsers: celebrate({
        [Segments.PARAMS]: {
            userType: Joi.string().required(),
        }
    }, { abortEarly: false, messages: messages, }),

    cep: celebrate({
        [Segments.PARAMS]: {
            cep: Joi.string().required().min(4),
        }
    }, { abortEarly: false, messages: messages, }),

    login: celebrate({

        [Segments.BODY]: {
            email: Joi.string().email(),
            password: Joi.string().required().min(6),
            userType: Joi.string().allow(),
        }

    }, { abortEarly: false, messages: messages, }),

    storeCustomer: celebrate({
        [Segments.BODY]: {
            cpf: Joi.string().required().min(11),
            password: Joi.string().required().min(6),
            platformCPFCNPJ: Joi.string().required().min(11).max(14),
            passwordRepeated: Joi.string().required().min(6),
            userName: Joi.string().required().min(10),
            email: Joi.string().email().required().min(5),
            address: Joi.object().keys({
                district: Joi.string().required().min(5),
                street: Joi.string().required().min(5),
                phoneNumber: Joi.string().required().min(12),
                addressNumber: Joi.number().required().positive(),
                addressCodePostal: Joi.string().required().min(7),
            }).required(),
        }
    }, { abortEarly: false, messages: messages, }),

    storeADM: celebrate({
        [Segments.BODY]: {
            cpf: Joi.string().required().min(11),
            password: Joi.string().required().min(6),
            passwordRepeated: Joi.string().required().min(6),
            userName: Joi.string().required().min(10),
            email: Joi.string().email().required().min(5),
            address: Joi.object().keys({
                district: Joi.string().required().min(5),
                street: Joi.string().required().min(5),
                phoneNumber: Joi.string().required().min(12),
                addressNumber: Joi.number().required().positive(),
                addressCodePostal: Joi.string().required().min(7),
            }).required(),
        }
    }, { abortEarly: false, messages: messages, }),

    storeEmployee: celebrate({
        [Segments.BODY]: {
            userName: Joi.string().required().min(5),
            email: Joi.string().email().required().min(5),
            userType: Joi.string().required(),
            password: Joi.string().required().min(6),
            passwordRepeated: Joi.string().required().min(6),
            isActive: Joi.boolean().allow(),
        }
    }, { abortEarly: false, messages: messages, }),

    storePlatform: celebrate({
        [Segments.BODY]: {
            cpfcnpj: Joi.string().required().min(5),
            platformName: Joi.string().required().min(5),
            companyName: Joi.string().required().min(3),
            corporateName: Joi.string().required().min(5),
            userName: Joi.string().required().min(5),
            email: Joi.string().email().required().min(5),
            password: Joi.string().required().min(6),
            passwordRepeated: Joi.string().required().min(6),
            plan: Joi.string().required(),
            isMonthPlan: Joi.boolean().required(),
            address: Joi.object().keys({
                district: Joi.string().required().min(5),
                street: Joi.string().required().min(5),
                phoneNumber: Joi.string().required().min(12),
                addressNumber: Joi.number().required().positive(),
                addressCodePostal: Joi.string().required().min(7),
            }).required(),
        }
    }, { abortEarly: false, messages: messages, }),

    patchClient: celebrate({

        [Segments.BODY]: {
            id: Joi.number().required().positive(),
            cnpj: Joi.string().required().min(5),
            companyName: Joi.string().required().min(3),
            corporateName: Joi.string().required().min(5),
            userName: Joi.string().required().min(5),
            email: Joi.string().email().required().min(5),
            password: Joi.string().required().min(6),
            passwordRepeated: Joi.string().required().min(6),
            address: Joi.object().keys({
                district: Joi.string().required().min(5),
                street: Joi.string().required().min(5),
                phoneNumber: Joi.string().required().min(12),
                addressNumber: Joi.number().required().positive(),
                addressCodePostal: Joi.string().required().min(7),
            }).required(),
        }

    }, { abortEarly: false, messages: messages, }),

    patchPhysicalPerson: celebrate({

        [Segments.BODY]: {
            id: Joi.number().required().positive(),
            cpf: Joi.string().required().min(11),
            password: Joi.string().required().min(6),
            passwordRepeated: Joi.string().required().min(6),
            userName: Joi.string().required().min(10),
            email: Joi.string().email().required().min(5),
            address: Joi.object().keys({
                district: Joi.string().required().min(5),
                street: Joi.string().required().min(5),
                phoneNumber: Joi.string().required().min(12),
                addressNumber: Joi.number().required().positive(),
                addressCodePostal: Joi.string().required().min(7),
            }).required(),
            userType: Joi.string().required(),
        }

    }, { abortEarly: false, messages: messages, }),

    patch: celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().positive().required(),
        },

        [Segments.BODY]: {
            userName: Joi.string().required(),
            email: Joi.string().allow(),
            isActive: Joi.boolean().allow(),
            userType: Joi.string().allow(),
            password: Joi.string().allow(),
            passwordRepeated: Joi.string().allow(),
        }

    }, { abortEarly: false, messages: messages, }),

}