import { Request, Response } from "express";
import { dataSource } from "../../ormconfig";
import { SpendingEntity } from "../entity/SpendingEntity";

export const SpendingController = {

    get: async (request: Request, response: Response) => {

        const auth = request.auth;
        const userAuth = auth.user;

        try {
            const statesRepository = dataSource.getRepository(SpendingEntity);

            const statesDataBase = await statesRepository.find();

            return response.json({
                data: statesDataBase,
                message: "Dados encontrados com sucesso.",
            });
        } catch (error) {
            return response.status(404).json({
                message: error,
            });
        }

    },

    store: async (request: Request, response: Response) => {

        const body = request.body;

        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;
        
        try {

            const spendingEntity = dataSource.getRepository(SpendingEntity);

            const spending = {
                name: body.name,
                value: body.value,
                amount: body.amount,
                fkPlatform: platform.id,
            };
            
            await spendingEntity.save(spending);
            
            return response.json({
                message: "Gastos salvos com sucesso!"
            });
            
            
        } catch (error) {
            
            return response.status(404).json(
                {
                    message: "Erro ao salvar gastos", error: error
                }
            );

        }

    }

};
