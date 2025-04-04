import { Request, Response } from "express";
import { dataSource } from "../services/database/database";
import { RawMaterialEntity } from "../entity/RawMaterialEntity";
import { RawMaterialView } from "../views/RawMaterialView";
import { ProvisionsEntity } from "../entity/ProvisionsEntity";
import { OrderEntity } from "../entity/OrdersEntity";


export const RawMaterialController = {

    getById: async (request: Request, response: Response) => {

        const { id } = request.params;
        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        try {

            const rawMaterialEntity = dataSource.getRepository(RawMaterialEntity);

            const rawMaterial = await rawMaterialEntity.find({
                where: {
                    fkProduct: { id: Number.parseInt(id) },
                    fkPlatform: platform.id,
                },
                relations: {
                    fkProduct: true,
                    fkRawMaterial: {
                        fkUnitMeasurement: true,
                    },
                }
            });

            const rawMaterialView = RawMaterialView.getById(rawMaterial);

            response.send({
                data: rawMaterialView,
                message: "Dados encontrados com sucesso.",
            });

        } catch (error) {
            response.status(404).send({
                message: error,
                error
            });
        }

    },

    getProfit: async (request: Request, response: Response) => {

        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        try {
            const rawMaterialRepository = dataSource.getRepository(RawMaterialEntity);

            const rawMaterialEntity = await rawMaterialRepository.find({
                where: {
                    fkPlatform: platform.id,
                    fkProduct: {
                        isActive: true
                    }
                },
                order: {
                    fkProduct: {
                        name: 'ASC',
                    }
                },
                relations: {
                    fkProduct: {
                        fkProductType: true
                    },
                    fkRawMaterial: true,
                }
            });

            const productView = RawMaterialView.getProfit(rawMaterialEntity)

            response.send({
                data: productView,
                message: "Dados encontrados com sucesso.",
            });
        } catch (error) {
            response.status(404).send({
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

        try {

            const rawMaterialEntity = dataSource.getRepository(RawMaterialEntity);

            const rawMaterial = {
                fkProduct: body.productId,
                fkRawMaterial: body.rawMaterialId,
                fkPlatform: platform.id,
                amount: body.amount,
                createdBy: user.id,
            };

            await rawMaterialEntity.save({
                ...rawMaterial
            });

            response.send({
                message: "Dados salvos com sucesso.",
            });

        } catch (error) {
            response.status(404).send({
                message: error,
                error
            });
        }

    },

    patch: async (request: Request, response: Response) => {

        const { id } = request.params;

        const body = request.body;
        const auth = request.auth;
        const user = auth.user;

        const rawMaterialId = Number.parseInt(id);

        try {

            const rawMaterialEntity = dataSource.getRepository(RawMaterialEntity);

            const rawMaterial = {
                fkProduct: body.productId,
                fkRawMaterial: body.rawMaterialId,
                amount: body.amount,
                updatedBy: user.id,
            };

            await rawMaterialEntity.update(rawMaterialId, {
                ...rawMaterial
            });

            response.send({
                message: "Dados atualizados com sucesso.",
            });

        } catch (error) {
            response.status(404).send({
                message: error,
                error
            });
        }

    },

    patchLowStock: async (request: Request, response: Response) => {

        const { orderid, productid } = request.params;

        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        const orderId: number = Number.parseInt(orderid);
        const productId: number = Number.parseInt(productid);

        try {

            const provisionsRepository = dataSource.getRepository(ProvisionsEntity);
            const rawMaterialRepository = dataSource.getRepository(RawMaterialEntity);
            const orderEntity = dataSource.getRepository(OrderEntity);

            const oldOrder = await orderEntity.findOne({
                where: { id: orderId }
            });

            const rawMaterial = await rawMaterialRepository.find({
                where: {
                    fkPlatform: platform.id,
                    fkProduct: {
                        id: productId,
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

            response.send({
                message: "Dados atualizados com sucesso.",
            });

        } catch (error) {
            response.status(404).send(
                {
                    message: "Erro ao salvar stock", error: error
                }
            );
        }

    },

    delete: async (request: Request, response: Response) => {

        const { id } = request.params;

        const rawMaterialId = Number.parseInt(id);

        try {

            const rawMaterialEntity = dataSource.getRepository(RawMaterialEntity);

            await rawMaterialEntity.delete(rawMaterialId);

            response.send({
                message: "Dados deletados com sucesso.",
            });

        } catch (error) {
            response.status(404).send({
                message: error,
                error
            });
        }

    },

}
