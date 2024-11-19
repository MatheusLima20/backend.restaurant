import { Request, Response } from "express";
import { dataSource } from "../services/database/database";
import { BoxDayEntity } from "../entity/BoxDayEntity";
import { BoxDayView } from "../views/BoxDayView";
import { OrderEntity } from "../entity/OrdersEntity";
import dayjs = require("dayjs");
import { PlatformEntity } from "../entity/PlatformEntity";
import { Like } from "typeorm";

export const BoxDayController = {

    get: async (request: Request, response: Response) => {

        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        try {
            const boxDayRepository = dataSource.getRepository(BoxDayEntity);
            const orderEntity = dataSource.getRepository(OrderEntity);

            const boxDay = await boxDayRepository.find({
                where: { fkPlatform: platform.id },
                order: { createdAt: 'DESC' },
                take: 20
            });

            let totalBoxs = [];

            for (let index = 0; index < boxDay.length; index++) {

                let totalOrders = 0;

                const orders = await orderEntity.find({
                    where: {
                        fkBoxDay: boxDay[index].id,
                        isCancelled: false,
                        fkPlatform: platform.id,
                    }
                });

                for (let index = 0; index < orders.length; index++) {
                    const order = orders[index];
                    const totalOrder = order.value * order.amount;
                    totalOrders = totalOrders + totalOrder;
                }

                totalBoxs.push(totalOrders);

            }

            const boxDayView = BoxDayView.get(boxDay, totalBoxs)

            response.send({
                data: boxDayView,
                message: "Dados encontrados com sucesso.",
            });
        } catch (error) {
            response.status(404).send({
                message: error, error
            });
        }

    },

    store: async (request: Request, response: Response) => {

        const auth = request.auth;

        const user = auth.user;

        const platform = user.platform;

        const dataBody = request.body;

        try {

            const boxDayRepository = dataSource.getRepository(BoxDayEntity);
            const orderRepository = dataSource.getRepository(OrderEntity);
            const platformRepository = dataSource.getRepository(PlatformEntity);

            const platformEntity = await platformRepository.findOne({
                where: {
                    id: platform.id,
                },
                relations: {
                    fkPlan: true,
                }
            });

            const order = await orderRepository.findOne({
                where: { fkPlatform: platform.id, isOpen: true }
            });

            if (order) {
                response.status(404).send(
                    {
                        message: "Existe pedido(s) em aberto!",
                        error: "Existe pedido(s) aberto."
                    }
                );
                return;
            }

            const oldBoxDay = await boxDayRepository.findOne({
                where: { isOpen: true, fkPlatform: platform.id }
            });

            if (oldBoxDay) {
                response.status(404).send(
                    {
                        message: "Já existe um caixa aberto!",
                        error: "Existe um caixa aberto."
                    }
                );
                return;
            }

            const boxdays = await boxDayRepository.find({
                where: {
                    createdAt: Like(`%${dayjs().format('YYYY-MM-DD')}%`) as any,
                    fkPlatform: platform.id
                }
            });

            const plan = platformEntity.fkPlan;

            const maxBoxdaysPlan = plan.maxBoxDay;

            const totalBoxdays = boxdays.length;

            const moreThanMaxBoxdays = totalBoxdays >= maxBoxdaysPlan;

            if (moreThanMaxBoxdays) {
                response.status(404).send(
                    {
                        message: "Máximo de caixas diário foi atingido."
                    }
                );
                return;
            }

            const startValue = dataBody.startValue ? dataBody.startValue : 0;

            const boxDay: any = {
                startValue: startValue,
                fkPlatform: platform.id,
                createdBy: user.id,
            }

            await boxDayRepository.save(boxDay);

            response.send(
                {
                    message: "Caixa salvo com sucesso!",
                }
            );


        } catch (error) {

            response.status(404).send(
                { message: "Erro ao cadastrar o caixa!", error }
            );

        }

    },

    patch: async (request: Request, response: Response) => {

        const { id } = request.params;
        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        try {

            const boxDayId: number = Number.parseInt(id);

            dataSource.transaction(async (transactionalEntityManager) => {

                const boxDayEntity = transactionalEntityManager.getRepository(BoxDayEntity);
                const orderEntity = dataSource.getRepository(OrderEntity);

                const order = await orderEntity.findOne({
                    where: { fkPlatform: platform.id, isOpen: true }
                });

                if (order) {
                    response.status(404).send(
                        {
                            message: "Ainda existem pedido(s) aberto(s)!",
                            error: "Ainda existem pedido(s) aberto(s)!"
                        }
                    );
                    return;
                }

                const boxDayOpen = await boxDayEntity.find({
                    where: { fkPlatform: platform.id, isOpen: true }
                });

                const oldBoxDay = await boxDayEntity.findOne({
                    where: { id: boxDayId, fkPlatform: platform.id }
                });

                if (boxDayOpen.length && !oldBoxDay.isOpen) {
                    response.status(404).send(
                        {
                            message: "Somente um caixa pode ficar aberto!",
                            error: "Existem pedidos abertos."
                        }
                    );
                    return;
                }

                const boxDay = {
                    isOpen: !oldBoxDay.isOpen,
                    updatedBy: user.id,
                    updatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss")
                };

                const spendingMerger = boxDayEntity.merge(oldBoxDay, boxDay)

                await boxDayEntity.update(boxDayId, spendingMerger);

                response.send({
                    message: "Caixa atualizado com sucesso!"
                });

            });


        } catch (error) {

            response.status(404).send(
                {
                    message: "Erro ao salvar caixa.", error: error
                }
            );

        }

    },

};
