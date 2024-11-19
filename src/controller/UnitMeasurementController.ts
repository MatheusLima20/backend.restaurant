import { Request, Response } from "express";
import { dataSource } from "../services/database/database";
import { UnitMeasurementEntity } from "../entity/UnitMeasurementEntity";
import { UnitMeasurementView } from "../views/UnitMeasurementView";


export const UnitMeasurementController = {

    get: async (request: Request, response: Response) => {

        try {

            const unitMeasurementRepository = dataSource.getRepository(UnitMeasurementEntity);

            const unitMeasurement = await unitMeasurementRepository.find();

            if (!unitMeasurement) {
                response.status(404).send({
                    message: "Nenhum dado encontrado."
                });
                return;
            }

            const unitMeasurementView = UnitMeasurementView.get(unitMeasurement);

            response.send({
                data: unitMeasurementView,
                message: "Dados encontrados com sucesso."
            });

        } catch (error) {
            response.status(404).send({
                message: error
            });
        }

    },

}
