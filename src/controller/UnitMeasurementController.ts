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
                response.status(404).json({
                    message: "Nenhum dado encontrado."
                });
            }

            const unitMeasurementView = UnitMeasurementView.get(unitMeasurement);

            response.json({
                data: unitMeasurementView,
                message: "Dados encontrados com sucesso."
            });

        } catch (error) {
            response.status(404).json({
                message: error
            });
        }

    },

}
