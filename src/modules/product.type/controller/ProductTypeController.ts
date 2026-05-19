import { Request, Response } from "express";
import { ProductTypeView } from "../views/ProductTypeView";
import { dataSource } from "../../../services/database/database";
import { ProductTypeEntity } from "../entities/ProductTypeEntity";


export const ProductTypeController = {

    get: async (request: Request, response: Response) => {

        try {

            const productTypeRepository = dataSource.getRepository(ProductTypeEntity);

            const productType = await productTypeRepository.find();

            if (!productType) {
                response.status(404).send({
                    message: "Nenhum dado encontrado."
                });
                return;
            }

            const productTypeView = ProductTypeView.get(productType);

            response.send({
                data: productTypeView,
                message: "Dados encontrados com sucesso."
            });

        } catch (error) {
            response.status(404).send({
                message: error
            });
        }

    },

}
