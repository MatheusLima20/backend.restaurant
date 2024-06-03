import { Request, Response } from "express";
import { dataSource } from "../data.source";
import { ProvisionsEntity } from "../entity/ProvisionsEntity";
import { UnitMeasurementEntity } from "../entity/UnitMeasurementEntity";
import { ProductView } from "../views/ProvisionsView";

export const ProvisionsController = {

    get: async (request: Request, response: Response) => {

        const { isproduct } = request.params;

        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;
        try {
            const productRepository = dataSource.getRepository(ProvisionsEntity);
            const isProduct = isproduct === "true";
            const products = await productRepository.find({
                where: { fkPlatform: platform.id, isPlate: isProduct },
                order: { createdAt: 'desc' },
                relations: {
                    fkUnitMeasurement: true
                }
            });

            const productView = ProductView.get(products)

            return response.json({
                data: productView,
                message: "Dados encontrados com sucesso.",
            });
        } catch (error) {
            return response.status(404).json({
                message: error,
                error
            });
        }

    },

    getPlates: async (request: Request, response: Response) => {

        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        try {
            const productRepository = dataSource.getRepository(ProvisionsEntity);

            const products = await productRepository.find({
                where: { fkPlatform: platform.id, show: true },
                relations: ['fkUnitMeasurement']
            });

            const productView = ProductView.get(products)

            return response.json({
                data: productView,
                message: "Dados encontrados com sucesso.",
            });
        } catch (error) {
            return response.status(404).json({
                message: error,
                error
            });
        }

    },

    store: async (request: Request, response: Response) => {

        const body: ProvisionsEntity = request.body;

        const auth = request.auth;

        const user = auth.user;

        const platform = user.platform;

        try {

            const productRepository = dataSource.getRepository(ProvisionsEntity);
            const unitMeasurementRepository = dataSource.getRepository(UnitMeasurementEntity);

            const unitMeasurement = await unitMeasurementRepository.findOne({
                where: { name: body.fkUnitMeasurement as any }
            });

            const product: any = {
                name: body.name,
                fkPlatform: platform.id,
                value: body.value,
                amount: body.amount,
                isActive: body.isActive,
                isPlate: body.isPlate,
                show: body.show,
                fkUnitMeasurement: unitMeasurement,
                createdBy: user.id,
            }

            await productRepository.save(product);

            return response.json(
                {
                    message: "Produto salvo com sucesso!",
                }
            );


        } catch (error) {

            return response.status(404).json(
                { message: "Erro ao cadastrar o produto!", error }
            );

        }

    },

    patch: async (request: Request, response: Response) => {

        const { id } = request.params;

        const body = request.body;

        const auth = request.auth;
        const user = auth.user;
        const add = body.add;

        try {

            dataSource.transaction(async (transactionalEntityManager) => {

                const productEntity = transactionalEntityManager.getRepository(ProvisionsEntity);
                const unitMeasurementRepository = dataSource.getRepository(UnitMeasurementEntity);

                const unitMeasurement = await unitMeasurementRepository.findOne({
                    where: { name: body.fkUnitMeasurement as any }
                });

                const productId: number = Number.parseInt(id);

                const oldProduct = await productEntity.findOne({
                    where: { id: productId }
                });

                let amount: number = body.amount;

                if (add) {
                    amount = oldProduct.amount + amount;
                }

                const product = {
                    name: body.name,
                    value: body.value,
                    amount: amount,
                    isActive: body.isActive,
                    show: body.show,
                    fkUnitMeasurement: unitMeasurement,
                    updatedBy: user.id
                };

                const spendingMerger = productEntity.merge(oldProduct, product)

                await productEntity.update(productId, spendingMerger);

                return response.json({
                    message: "Produtos alterados com sucesso!"
                });

            });


        } catch (error) {

            return response.status(404).json(
                {
                    message: "Erro ao salvar gastos", error: error
                }
            );

        }

    },

};
