import { Request, Response } from "express";
import { StatesEntity } from "../entity/StatesEntity";
import { StatesView } from "../views/StatesView";
import { dataSource } from "../services/database/database";

export const StatesController = {
    get: async (request: Request, response: Response) => {
        const auth = request.auth;
        const userAuth = auth.user;

        try {
            const statesRepository = dataSource.getRepository(StatesEntity);

            const statesDataBase = await statesRepository.find();

            const statesView = StatesView.get(statesDataBase);

            response.send({
                data: statesView,
                message: "Dados encontrados com sucesso.",
            });
        } catch (error) {
            response.status(404).send({
                message: error,
            });
        }
    },
};
