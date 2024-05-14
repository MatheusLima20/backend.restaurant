import { Request, Response } from "express";
import { StatesEntity } from "../entity/StatesEntity";
import { StatesView } from "../views/StatesView";
import { dataSource } from "../data.source";

export const StatesController = {
    get: async (request: Request, response: Response) => {
        const auth = request.auth;
        const userAuth = auth.user;

        try {
            const statesRepository = dataSource.getRepository(StatesEntity);

            const statesDataBase = await statesRepository.find();

            const statesView = StatesView.get(statesDataBase);

            return response.json({
                data: statesView,
                message: "Dados encontrados com sucesso.",
            });
        } catch (error) {
            return response.status(404).json({
                message: error,
            });
        }
    },
};
