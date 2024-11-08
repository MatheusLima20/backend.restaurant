import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { AdmLogin } from "../encripty/AdmLogin";
import { UserEntity } from "../../../entity/UserEntity";
import { dataSource } from "../../database/database";

export const Authorization = {
    auth: async (request: Request, response: Response) => {
        const user = request.body as UserEntity;

        try {
            const token = jwt.sign(
                {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        userType: user.fkUserType.name,
                        platform: {
                            id: user.fkPlatform.id,
                            name: user.fkPlatform.name,
                        },
                        plan: user.fkPlatform.fkPlan.name,
                    },
                },
                "secret",
                {
                    expiresIn: "30d",
                }
            );

            const providerName = user.name;

            const nameProviderArray = providerName.split(" ");

            const fistName = nameProviderArray[0];

            return response.json({
                message: "Logado com sucesso!",
                user: {
                    name: fistName,
                    userType: user.fkUserType.name,
                    token,
                    platformId: user.fkPlatform.id,
                    platformName: user.fkPlatform.name,
                    plan: user.fkPlatform.fkPlan.name,
                },
            });
        } catch (error) {
            console.log(error)
            return response.status(404).json({
                error,
                message: "Não foi possivel validar o login.",
            });
        }
    },

    verifyLogin: async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        const userBody = request.body;

        const email = userBody.email;
        const userType = userBody.userType;

        try {
            const userRepository = dataSource.getRepository(UserEntity);

            let user: UserEntity;

            if (userType) {
                user = await userRepository.findOne({
                    where: {
                        email: email, isActive: true, fkUserType: {
                            name: userType
                        }
                    },
                    relations: ["fkPlatform", "fkUserType", 'fkPlatform.fkPlan'],
                });
            }
            
            if (!userType) {
                user = await userRepository.findOne({
                    where: { email: email, isActive: true },
                    relations: ["fkPlatform", "fkUserType", 'fkPlatform.fkPlan'],
                });

            }
            
            if (user === undefined) {
                return response
                    .status(404)
                    .json({ message: "Usuário ou senha incorretos!" });
            }

            const password = user.password;

            const isValidPassword = AdmLogin.checkLogin(
                user.email,
                userBody.email,
                userBody.password,
                password
            );
            if (!isValidPassword) {
                return response
                    .status(404)
                    .json({ message: "Usuário ou senha incorretos!" });
            }

            request.body = user;

            next();
        } catch (error) {
            return response.status(404).json({
                error,
                message: '"Não foi possivel validar o login."',
            });
        }
    },

};
