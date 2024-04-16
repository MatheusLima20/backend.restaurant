import { Request, Response } from "express";
import { dataSource } from "../../ormconfig";
import { ProductEntity } from "../entity/ProductEntity";
import { UnitMeasurementEntity } from "../entity/UnitMeasurementEntity";

export const ProductController = {


    store: async (request: Request, response: Response) => {

        const body: ProductEntity = request.body;

        const auth = request.auth;

        const user = auth.user;

        const platform = user.platform;        
        
        try {

            const productRepository = dataSource.getRepository(ProductEntity);
            const unitMeasurementRepository = dataSource.getRepository(UnitMeasurementEntity);

            const unitMeasurement = await unitMeasurementRepository.findOne({
                where: body.unitMeasurement
            });

            const product: ProductEntity = {
                name: body.name,
                platform: platform.id,
                value: body.value,
                amount: body.amount,
                isActive: body.isActive,
                show: body.show,
                unitMeasurement: unitMeasurement,
                ...body
            }

            await productRepository.save(product);

            return response.json(
                {
                    message: "Produto salvo com sucesso!"
                }
            );

            
        } catch (error) {
            
            return response.status(404).json("Erro ao cadastrar o produto!");

        }

    }

};
