import { Request, Response } from "express";
import { dataSource } from "../services/database/database";
import { OrderEntity } from "../entity/OrdersEntity";
import { ProvisionsEntity } from "../entity/ProvisionsEntity";
import { BoxDayEntity } from "../entity/BoxDayEntity";
import { OrderView } from "../views/OrderView";
import { Like } from "typeorm";
import { UserEntity } from "../entity/UserEntity";
import dayjs = require("dayjs");
import { LogController } from "./LogContoller";
import { TableEntity } from "../entity/TableEntity ";

export const OrderController = {
    getByDate: async (request: Request, response: Response) => {
        const { date } = request.params;

        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        const userType = user.userType;

        if (userType !== "SUPER") {
            response.status(404).send({
                data: [],
                message: "Usuário sem permissão.",
            });
            return;
        }

        try {
            const orderRepository = dataSource.getRepository(OrderEntity);

            const order = await orderRepository.find({
                where: {
                    fkPlatform: platform.id,
                    isOpen: false,
                    isCancelled: false,
                    createdAt: Like(`%${date}%`) as any,
                },
                order: { createdAt: "DESC" },
            });

            const orderView = OrderView.getByDate(order);

            response.send({
                data: orderView,
                message: "Dados encontrados com sucesso.",
            });
        } catch (error) {
            response.status(404).send({
                message: error,
                error,
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
                order: { createdAt: "DESC" },
            });

            let users: UserEntity[] = [];

            for (let i = 0; i < orders.length; i++) {
                const user = await userRepository.findOne({
                    where: { id: orders[i].createdBy },
                });
                users.push(user);
            }

            const orderView = OrderView.getByTable(orders, users);

            response.send({
                data: orderView,
                message: "Dados encontrados com sucesso.",
            });
        } catch (error) {
            response.status(404).send({
                message: error,
                error,
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
                order: { description: "ASC" },
            });

            let users: UserEntity[] = [];

            for (let i = 0; i < orders.length; i++) {
                const user = await userRepository.findOne({
                    where: { id: orders[i].updatedBy },
                });
                users.push(user);
            }

            const orderView = OrderView.getByBoxDay(orders, users);

            response.send({
                data: orderView,
                message: "Dados encontrados com sucesso.",
            });
        } catch (error) {
            response.status(404).send({
                message: error,
                error,
            });
        }
    },

    getByStatus: async (request: Request, response: Response) => {
        const { status } = request.params;

        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        try {
            const orderRepository = dataSource.getRepository(OrderEntity);

            const orders = await orderRepository.find({
                where: {
                    fkPlatform: platform.id,
                    status: Like(`%${status}%`) as any,
                },
                order: { order: "ASC" },
            });

            const orderView = OrderView.getByStatus(orders);

            response.send({
                data: orderView,
                message: "Dados encontrados com sucesso.",
            });
        } catch (error) {
            response.status(404).send({
                message: error,
                error,
            });
        }
    },

    store: async (request: Request, response: Response) => {
        const body = request.body;
        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        const idProduct = Number.parseInt(body.idProduct);

        try {
            const orderRepository = dataSource.getRepository(OrderEntity);
            const boxDayRepository = dataSource.getRepository(BoxDayEntity);
            const productRepository =
                dataSource.getRepository(ProvisionsEntity);

            const boxDay = await boxDayRepository.findOne({
                where: { fkPlatform: platform.id, isOpen: true },
            });

            if (!boxDay) {
                response.status(404).send({
                    message: "Nenhum caixa aberto",
                    error: "Erro",
                });
                return;
            }

            const product = await productRepository.findOne({
                where: { id: idProduct },
                relations: {
                    fkProductType: true,
                },
            });

            const status = !product.toCook ? "finalizado" : undefined;

            const order: any = {
                fkProductId: idProduct,
                fkPlatform: platform.id,
                fkTable: body.idTable,
                fkBoxDay: boxDay.id,
                description: product.name,
                observation: body.observation,
                amount: body.amount,
                status: status,
                value: product.value,
                productType: product.fkProductType.name,
                createdBy: user.id,
            };

            await orderRepository.save({ ...order });

            const message = `Pedido realizado por: ${user.name}, 
                Cod: ${product.id}, Produto: ${product.name}, Quantidade: ${order.amount}.`;

            await LogController.store(user, "Pedido Salvo", message, "Salvo");

            response.send({
                message: "Pedido salvo com sucesso!",
            });
        } catch (error) {
            response.status(404).send({
                message: error,
                error,
            });
        }
    },

    patch: async (request: Request, response: Response) => {
        const { id } = request.params;

        const body = request.body;

        const auth = request.auth;
        const user = auth.user;

        const productId = body.productId;
        const isOpen = body?.isOpen;

        try {
            dataSource.transaction(async (transactionalEntityManager) => {
                const orderEntity =
                    transactionalEntityManager.getRepository(OrderEntity);
                const boxDayRepository = dataSource.getRepository(BoxDayEntity);
                const productRepository =
                    dataSource.getRepository(ProvisionsEntity);

                const orderId: number = Number.parseInt(id);
                const oldOrder = await orderEntity.findOne({
                    where: { id: orderId },
                });

                let product: ProvisionsEntity;
                let amount = body?.amount;
                const status = body?.status;

                if (productId && amount) {
                    product = await productRepository.findOne({
                        where: { id: Number.parseInt(productId) },
                        relations: {
                            fkProductType: true,
                        },
                    });

                    if (amount < 0) {
                        amount = oldOrder.amount + amount;
                    }

                    const verifyAmount = amount < 1;

                    if (verifyAmount) {
                        response.status(404).send({
                            message:
                                "A quantidade para cancelar é maior ou " +
                                "igual a registrada.",
                            error: "Quantidade menor.",
                        });
                        return;
                    }

                    const platform = user.platform;

                    const boxDay = await boxDayRepository.findOne({
                        where: { fkPlatform: platform.id, isOpen: true },
                    });

                    const order: any = {
                        fkProductId: product.id,
                        fkPlatform: platform.id,
                        fkTable: oldOrder.fkTable,
                        fkBoxDay: boxDay.id,
                        description: product.name,
                        observation: body.observation,
                        amount: body?.amount * -1,
                        status: "cancelado",
                        isCancelled: true,
                        isOpen: false,
                        value: product.value,
                        productType: product.fkProductType.name,
                        createdBy: user.id,
                        updatedBy: user.id,
                    };

                    await orderEntity.save({ ...order });
                }

                const date: any = dayjs().format("YYYY-MM-DD HH:mm:ss");

                const updatedBy = !oldOrder.isCancelled ? user.id : undefined;

                const deliveryDate: any =
                    status === "finalizado" && oldOrder.status !== "finalizado"
                        ? date
                        : undefined;

                const order: any = {
                    description: product?.name,
                    fkProductId: productId,
                    value: product?.value,
                    amount: amount,
                    isCancelled: body?.isCancelled,
                    isOpen: isOpen,
                    paymentMethod: body?.paymentMethod,
                    status: status,
                    updatedBy: updatedBy,
                    deliveryDate: deliveryDate,
                    updatedAt: date,
                };

                const spendingMerger = orderEntity.merge(oldOrder, order);

                await orderEntity.update(orderId, spendingMerger);

                const message = `Pedido alterado por: ${user.name}, 
                Cod: ${order.id}, Produto: ${order.description}, Quantidade: ${amount},
                 Status: ${status}, Cancelado: ${body.isCancelled}.`;

                await LogController.store(
                    user,
                    "Pedido Alterado",
                    message,
                    "Alterado"
                );

                response.send({
                    message: "Pedido alterado com sucesso!",
                });
            });
        } catch (error) {
            response.status(404).send({
                message: "Erro ao salvar prato " + error,
                error: error,
            });
        }
    },

    patchs: async (request: Request, response: Response) => {
        const body = request.body;

        const auth = request.auth;
        const user = auth.user;

        const platform = user.platform;

        const orders: OrderEntity[] = body.orders;

        const status = body?.status;

        try {
            dataSource.transaction(async (transactionalEntityManager) => {
                const orderEntity =
                    transactionalEntityManager.getRepository(OrderEntity);

                for (let index = 0; index < orders.length; index++) {
                    const element = orders[index];

                    const orderId: number = element.id;
                    const oldOrder = await orderEntity.findOne({
                        where: { id: orderId },
                    });

                    let orderNumber: number = 0;

                    if (status === "processando") {
                        const order = await orderEntity.findOne({
                            where: {
                                fkPlatform: platform.id,
                                isOpen: true,
                                isCancelled: false,
                                status: "processando",
                            },
                            order: { order: "DESC" },
                        });
                        orderNumber = order?.order ? order.order : 0;
                        orderNumber = orderNumber + 1;
                    }

                    const order: any = {
                        status: status,
                        order: orderNumber,
                        updatedBy: user.id,
                        updatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                    };

                    const orderMerger = orderEntity.merge(oldOrder, order);

                    await orderEntity.update(orderId, orderMerger);

                    const message = `Pedido alterado por: ${user.name}, 
                        Cod: ${orderMerger.id}, Produto: ${orderMerger.description}, 
                        Quantidade: ${orderMerger.amount},
                        Status: ${status}, Cancelado: ${body.isCancelled}.`;

                    await LogController.store(
                        user,
                        "Pedido Alterado",
                        message,
                        "Alterado"
                    );
                }

                response.send({
                    message: "Pedido alterado com sucesso!",
                });
            });
        } catch (error) {
            response.status(404).send({
                message: "Erro ao salvar prato " + error,
                error: error,
            });
        }
    },

    patchChangeTableOrders: async (request: Request, response: Response) => {
        const { idTable1, idTable2 } = request.params;
        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        try {
            const table1Id: number = Number.parseInt(idTable1);
            const table2Id: number = Number.parseInt(idTable2);

            dataSource.transaction(async (transactionalEntityManager) => {
                const ordersEntity =
                    transactionalEntityManager.getRepository(OrderEntity);
                const tableRepository = dataSource.getRepository(TableEntity);

                const ordersTable1 = await ordersEntity.find({
                    where: {
                        fkTable: table1Id,
                        fkPlatform: platform.id,
                        isOpen: true,
                        isCancelled: false,
                    },
                });

                const ordersTable2 = await ordersEntity.find({
                    where: {
                        fkTable: table2Id,
                        fkPlatform: platform.id,
                        isOpen: true,
                        isCancelled: false,
                    },
                });

                if (!ordersTable1.length) {
                    response.status(404).send({
                        message: "Mesa sem pedidos.",
                        error: "Erro na troca ",
                    });
                    return;
                }

                if (ordersTable2.length) {
                    response.status(404).send({
                        message: "A Mesa já está ocupada.",
                        error: "Erro na troca ",
                    });
                    return;
                }

                const table = {
                    fkTable: table2Id,
                    updatedBy: user.id,
                };

                for (let index = 0; index < ordersTable1.length; index++) {
                    const oldOrder = ordersTable1[index];

                    const spendingMerger = ordersEntity.merge(oldOrder, table);

                    await ordersEntity.update(oldOrder.id, spendingMerger);
                }

                const oldTable = await tableRepository.findOne({
                    where: {
                        id: table1Id,
                    },
                });

                const newTable = await tableRepository.findOne({
                    where: {
                        id: table2Id,
                    },
                });

                const message = `Mesa alterada por: ${user.name}, 
                    Mesa Antiga: ${oldTable.name}, Mesa nova: ${newTable.name}`;

                await LogController.store(
                    user,
                    "Mesa Alterada",
                    message,
                    "Alterado"
                );

                response.send({
                    message: "Mesa atualizado com sucesso!",
                });
            });
        } catch (error) {
            response.status(404).send({
                message: "Erro ao trocar mesas.",
                error: error,
            });
        }
    },
};
