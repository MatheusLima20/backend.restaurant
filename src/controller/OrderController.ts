import { Request, Response } from "express";
import { dataSource } from "../data.source";
import { OrderEntity } from "../entity/OrdersEntity";
import { ProvisionsEntity } from "../entity/ProvisionsEntity";
import { BoxDayEntity } from "../entity/BoxDayEntity";
import { OrderView } from "../views/OrderView";
import { Like } from "typeorm";
import { UserEntity } from "../entity/UserEntity";
import dayjs = require("dayjs");

export const OrderController = {

    getByDate: async (request: Request, response: Response) => {

        const { date } = request.params;

        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        const userType = user.userType;

        if (userType !== "SUPER") {
            return response.status(404).json({
                data: [],
                message: "Usuário sem permissão.",
            });
        }

        try {
            const orderRepository = dataSource.getRepository(OrderEntity);

            const order = await orderRepository.find({
                where: {
                    fkPlatform: platform.id,
                    isOpen: false,
                    isCancelled: false,
                    createdAt: Like(`%${date}%`) as any
                },
                order: { createdAt: 'DESC' }
            });

            const orderView = OrderView.getByDate(order);

            return response.json({
                data: orderView,
                message: "Dados encontrados com sucesso.",
            });
        } catch (error) {
            return response.status(404).json({
                message: error, error
            });
        }

    },

    getByTable: async (request: Request, response: Response) => {

        const { id } = request.params;

        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        try {
            const userRepository = dataSource.getRepository(UserEntity);

            const orderRepository = dataSource.getRepository(OrderEntity);

            const orders = await orderRepository.find({
                where: {
                    fkPlatform: platform.id,
                    fkTable: Number.parseInt(id),
                    isOpen: true,
                    isCancelled: false,
                },
                order: { createdAt: 'DESC' },
            });

            let users: UserEntity[] = [];

            for (let i = 0; i < orders.length; i++) {
                const user = await userRepository.findOne({
                    where: { id: orders[i].createdBy }
                });
                users.push(user);
            }

            const orderView = OrderView.getByTable(orders, users);

            return response.json({
                data: orderView,
                message: "Dados encontrados com sucesso.",
            });
        } catch (error) {
            return response.status(404).json({
                message: error, error
            });
        }

    },

    getByBoxDay: async (request: Request, response: Response) => {

        const { id, isCancelled }: any = request.params;

        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        try {
            const userRepository = dataSource.getRepository(UserEntity);
            const orderRepository = dataSource.getRepository(OrderEntity);

            const orders = await orderRepository.find({
                where: {
                    fkPlatform: platform.id,
                    fkBoxDay: Number.parseInt(id),
                    isCancelled: isCancelled,
                },
                order: { description: 'ASC' }
            });

            let users: UserEntity[] = [];

            for (let i = 0; i < orders.length; i++) {
                const user = await userRepository.findOne({
                    where: { id: orders[i].updatedBy }
                });
                users.push(user);
            }

            const orderView = OrderView.getByBoxDay(orders, users);

            return response.json({
                data: orderView,
                message: "Dados encontrados com sucesso.",
            });
        } catch (error) {
            return response.status(404).json({
                message: error, error
            });
        }

    },

    store: async (request: Request, response: Response) => {

        const body = request.body;
        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        try {

            const orderRepository = dataSource.getRepository(OrderEntity);
            const boxDayRepository = dataSource.getRepository(BoxDayEntity);
            const productRepository = dataSource.getRepository(ProvisionsEntity);

            const boxDay = await boxDayRepository.findOne({
                where: { fkPlatform: platform.id, isOpen: true }
            });

            if (!boxDay) {
                return response.status(404).json({
                    message: "Nenhum caixa aberto",
                    error: "Erro"
                });
            }

            const product = await productRepository.findOne({
                where: { id: Number.parseInt(body.idProduct) }
            });

            const order: any = {
                fkPlatform: platform.id,
                fkTable: body.idTable,
                fkBoxDay: boxDay.id,
                description: product.name,
                amount: body.amount,
                value: product.value,
                createdBy: user.id,
            }

            await orderRepository.save({ ...order });

            return response.json({
                message: "Pedido salvo com sucesso!"
            });

        } catch (error) {
            return response.status(404).json({
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

        const productId = body.productId;

        try {

            dataSource.transaction(async (transactionalEntityManager) => {

                const orderEntity = transactionalEntityManager.getRepository(OrderEntity);
                const productRepository = dataSource.getRepository(ProvisionsEntity);

                const orderId: number = Number.parseInt(id);
                const oldOrder = await orderEntity.findOne({
                    where: { id: orderId }
                });

                let product: any;
                let amount = body?.amount;

                if (productId) {
                    product = await productRepository.findOne({
                        where: { id: Number.parseInt(productId) }
                    });

                    if (amount < 0) {
                        amount = oldOrder.amount + amount;
                    }

                    const verifyAmount = amount < 1;

                    if (verifyAmount) {
                        return response.status(404).json(
                            {
                                message: "A quantidade para cancelar é maior ou " +
                                    "igual a registrada.",
                                error: "Quantidade menor."
                            }
                        );
                    }

                }

                const order: any = {
                    description: product?.name,
                    value: product?.value,
                    amount: amount,
                    isCancelled: body?.isCancelled,
                    isOpen: body?.isOpen,
                    updatedBy: user.id,
                    updatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss")
                };


                const spendingMerger = orderEntity.merge(oldOrder, order)

                await orderEntity.update(orderId, spendingMerger);

                return response.json({
                    message: "Pedido alterado com sucesso!"
                });

            });


        } catch (error) {

            return response.status(404).json(
                {
                    message: "Erro ao salvar prato " + error, error: error
                }
            );

        }

    },

    patchChangeTableOrders: async (request: Request, response: Response) => {

        const { idTable1, idTable2 } = request.params;
        const body = request.body;
        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        try {

            const table1Id: number = Number.parseInt(idTable1);
            const table2Id: number = Number.parseInt(idTable2);

            dataSource.transaction(async (transactionalEntityManager) => {

                const ordersEntity = transactionalEntityManager.getRepository(OrderEntity);

                const ordersTable1 = await ordersEntity.find({
                    where: {
                        fkTable: table1Id,
                        fkPlatform: platform.id,
                        isOpen: true,
                        isCancelled: false,
                    }
                });

                const ordersTable2 = await ordersEntity.find({
                    where: {
                        fkTable: table2Id,
                        fkPlatform: platform.id,
                        isOpen: true,
                        isCancelled: false,
                    }
                });

                if (!ordersTable1.length) {
                    return response.status(404).json(
                        {
                            message: "Mesa sem pedidos.",
                            error: "Erro na troca "
                        }
                    );
                }

                if (ordersTable2.length) {
                    return response.status(404).json(
                        {
                            message: "A Mesa já está ocupada.",
                            error: "Erro na troca "
                        }
                    );
                }

                const table = {
                    fkTable: table2Id,
                    updatedBy: user.id
                };

                for (let index = 0; index < ordersTable1.length; index++) {
                    const oldOrder = ordersTable1[index];

                    const spendingMerger = ordersEntity.merge(oldOrder, table)

                    await ordersEntity.update(oldOrder.id, spendingMerger);

                }

                return response.json({
                    message: "Caixa atualizado com sucesso!"
                });

            });


        } catch (error) {

            return response.status(404).json(
                {
                    message: "Erro ao salvar caixa.", error: error
                }
            );

        }

    },

};
