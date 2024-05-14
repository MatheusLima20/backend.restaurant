import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { AdmLogin } from "./AdmLogin";
import { UserEntity } from "../../entity/UserEntity";
import { dataSource } from "../../../ormconfig";

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
                    },
                },
                "secret",
                {
                    expiresIn: "30d",
                }
            );

            const providerName = user.name;

            const nameProviderArray = providerName.split(" ");

            const fistProviderName = nameProviderArray[0];

            return response.json({
                message: "Logado com sucesso!",
                user: {
                    name: fistProviderName,
                    userType: user.fkUserType.name,
                    token,
                    platformId: user.fkPlatform.id,
                    platformName: user.fkPlatform.name,
                },
            });
        } catch (error) {
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

        try {
            const userRepository = dataSource.getRepository(UserEntity);

            const user = await userRepository.findOne({
                where: { email: email, isActive: true },
                relations: ["fkPlatform", "fkUserType"],
            });

            if (!user) {
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
