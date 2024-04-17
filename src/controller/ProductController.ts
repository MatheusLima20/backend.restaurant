import { Request, Response } from "express";
import { dataSource } from "../../ormconfig";
import { ProductEntity } from "../entity/ProductEntity";
import { UnitMeasurementEntity } from "../entity/UnitMeasurementEntity";
import { ProductView } from "../views/ProductView";

export const ProductController = {

    get: async (request: Request, response: Response) => {

        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        try {
            const productRepository = dataSource.getRepository(ProductEntity);

            const products = await productRepository.find({
                where: {fkPlatform: platform.id}
            });

            const productView = ProductView.get(products)

            return response.json({
                data: productView,
                message: "Dados encontrados com sucesso.",
            });
        } catch (error) {
            return response.status(404).json({
                message: error,
            });
        }

    },


    store: async (request: Request, response: Response) => {

        const body: ProductEntity = request.body;

        const auth = request.auth;

        const user = auth.user;

        const platform = user.platform;        
        
        try {

            const productRepository = dataSource.getRepository(ProductEntity);
            const unitMeasurementRepository = dataSource.getRepository(UnitMeasurementEntity);
            
            const unitMeasurement = await unitMeasurementRepository.findOne({
                where: {name: body.unitMeasurement as any}
            });
            
            const product: any = {
                name: body.name,
                platform: platform.id,
                value: body.value,
                amount: body.amount,
                isActive: body.isActive,
                show: body.show,
                unitMeasurement: unitMeasurement,
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
