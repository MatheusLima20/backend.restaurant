import { Request, Response } from "express";
import { dataSource } from "../data.source";
import { ProvisionsEntity } from "../entity/ProvisionsEntity";
import { UnitMeasurementEntity } from "../entity/UnitMeasurementEntity";
import { ProductView } from "../views/ProvisionsView";
import dayjs = require("dayjs");
import { ProductTypeEntity } from "../entity/ProductTypeEntity";
import { RawMaterialEntity } from "../entity/RawMaterialEntity";
import { OrderEntity } from "../entity/OrdersEntity";

export const ProvisionsController = {

    get: async (request: Request, response: Response) => {

        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;
        try {
            const productRepository = dataSource.getRepository(ProvisionsEntity);

            const products = await productRepository.find({
                where: { fkPlatform: platform.id, isPlate: false },
                order: { createdAt: 'desc' },
                relations: {
                    fkUnitMeasurement: true,
                }
            });

            const productView = ProductView.get(products);

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
                where: { fkPlatform: platform.id, isPlate: true },
                relations: {
                    fkProductType: true
                }
            });

            const productView = ProductView.getPlates(products)

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

        const body = request.body;

        const auth = request.auth;

        const user = auth.user;

        const platform = user.platform;

        const userType = user.userType;

        if (userType !== "SUPER") {
            return response.status(404).json({
                message: "Usuário sem permissão.",
            });
        }

        try {

            const productRepository = dataSource.getRepository(ProvisionsEntity);
            const unitMeasurementRepository = dataSource.getRepository(UnitMeasurementEntity);
            const productTypeRepository = dataSource.getRepository(ProductTypeEntity);

            let unitMeasurement: UnitMeasurementEntity;
            let productType: ProductTypeEntity;

            if (body.unitMeasurement) {
                unitMeasurement = await unitMeasurementRepository.findOne({
                    where: { name: body.unitMeasurement as any }
                });
            }

            if (body.productType) {
                productType = await productTypeRepository.findOne({
                    where: { name: body.productType as any }
                });
            }

            const product: any = {
                name: body.name,
                fkPlatform: platform.id,
                value: body.value,
                amount: body.amount,
                isActive: body.isActive,
                isPlate: body.isPlate,
                show: body.show,
                toCook: body.toCook,
                fkUnitMeasurement: unitMeasurement,
                fkProductType: productType,
                createdBy: user.id,
            }

            const productData = await productRepository.save(product);

            const productView = ProductView.store(productData);

            return response.json(
                {
                    data: productView,
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

        const userType = user.userType;

        if (userType !== "SUPER") {
            return response.status(404).json({
                message: "Usuário sem permissão.",
            });
        }
        try {

            dataSource.transaction(async (transactionalEntityManager) => {

                const productEntity = transactionalEntityManager.getRepository(ProvisionsEntity);
                const unitMeasurementRepository = dataSource.getRepository(UnitMeasurementEntity);
                const productTypeRepository = dataSource.getRepository(ProductTypeEntity);

                let unitMeasurement: UnitMeasurementEntity;
                let productType: ProductTypeEntity;

                if (body.unitMeasurement) {
                    unitMeasurement = await unitMeasurementRepository.findOne({
                        where: { name: body.unitMeasurement as any }
                    });
                }

                if (body.productType) {
                    productType = await productTypeRepository.findOne({
                        where: { name: body.productType as any }
                    });
                }
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
                    toCook: body.toCook,
                    fkUnitMeasurement: unitMeasurement,
                    fkProductType: productType,
                    updatedBy: user.id,
                    updatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss")
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
                    message: "Erro ao salvar produtos", error: error
                }
            );

        }

    },

    patchLowStock: async (request: Request, response: Response) => {

        const { id } = request.params;

        const body = request.body;
        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        const productId = body.productId;

        try {

            const provisionsRepository = dataSource.getRepository(ProvisionsEntity);
            const rawMaterialRepository = dataSource.getRepository(RawMaterialEntity);
            const orderEntity = dataSource.getRepository(OrderEntity);

            const orderId: number = Number.parseInt(id);
                const oldOrder = await orderEntity.findOne({
                    where: { id: orderId }
                });

            const rawMaterial = await rawMaterialRepository.find({
                where: {
                    fkPlatform: platform.id,
                    fkProduct: {
                        id: Number.parseInt(productId),
                    }
                },
                relations: {
                    fkRawMaterial: true,
                }
            });

            if (rawMaterial.length) {

                for (let index = 0; index < rawMaterial.length; index++) {
                    const material = rawMaterial[index];
                    const provision = await provisionsRepository.findOne({
                        where: {
                            id: material.fkRawMaterial.id,
                            fkPlatform: platform.id,
                        }
                    });
                    const orderAmount = oldOrder.amount;
                    const low = (provision.amount) -
                        (material.amount * orderAmount);
                    const newProvision = {
                        amount: low
                    }
                    const provisionMerger = provisionsRepository.merge(provision, newProvision);
                    await provisionsRepository.update(provision.id, provisionMerger);
                }

            }

        } catch (error) {
            return response.status(404).json(
                {
                    message: "Erro ao salvar stock", error: error
                }
            );
        }

    },

};
