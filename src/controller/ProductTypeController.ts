import { Request, Response } from "express";
import { dataSource } from "../services/database/database";
import { ProductTypeEntity } from "../entity/ProductTypeEntity";
import { ProductTypeView } from "../views/ProductTypeView";


export const ProductTypeController = {

    get: async (request: Request, response: Response) => {

        try {

            const productTypeRepository = dataSource.getRepository(ProductTypeEntity);

            const productType = await productTypeRepository.find();

            if (!productType) {
                response.status(404).json({
                    message: "Nenhum dado encontrado."
                });
            }

            const productTypeView = ProductTypeView.get(productType);

            response.json({
                data: productTypeView,
                message: "Dados encontrados com sucesso."
            });

        } catch (error) {
            response.status(404).json({
                message: error
            });
        }

    },

}
