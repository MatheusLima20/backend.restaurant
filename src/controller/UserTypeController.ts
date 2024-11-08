import { Request, Response } from "express";
import { UserTypeEntity } from "../entity/UserTypeEntity";
import { UserTypeView } from "../views/UserTypeView";
import { dataSource } from "../services/database/database";


export const UserTypeController = {

    get: async (request: Request, response: Response) => {

        try {

            const userTypeRepository = dataSource.getRepository(UserTypeEntity);

            const userType = await userTypeRepository.find();

            if (!userType) {
                response.status(404).json({
                    message: "Nenhum dado encontrado."
                });
            }

            const userTypeView = UserTypeView.get(userType);

            response.json({
                data: userTypeView,
                message: "Dados encontrados com sucesso."
            });

        } catch (error) {
            response.status(404).json({
                message: error
            });
        }

    },

}
