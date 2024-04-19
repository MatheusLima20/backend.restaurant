import { Request, Response } from "express";
import { dataSource } from "../../ormconfig";
import { BoxDayEntity } from "../entity/BoxDayEntity";
import { BoxDayView } from "../views/BoxDayView";
import { OrderEntity } from "../entity/OrdersEntity";

export const BoxDayController = {

    get: async (request: Request, response: Response) => {

        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        try {
            const boxDayRepository = dataSource.getRepository(BoxDayEntity);

            const boxDay = await boxDayRepository.find({
                where: { fkPlatform: platform.id },
                order: {createdAt : 'DESC'}
            });

            const boxDayView = BoxDayView.get(boxDay)

            return response.json({
                data: boxDayView,
                message: "Dados encontrados com sucesso.",
            });
        } catch (error) {
            return response.status(404).json({
                message: error, error
            });
        }

    },

    store: async (request: Request, response: Response) => {

        const auth = request.auth;

        const user = auth.user;

        const platform = user.platform;

        try {

            const boxDayRepository = dataSource.getRepository(BoxDayEntity);
            const orderRepository = dataSource.getRepository(OrderEntity);

            const order = await orderRepository.findOne({
                where: { fkPlatform: platform.id, isOpen: true }
            });

            if (order) {
                return response.status(404).json(
                    {
                        message: "Existe pedido(s) em aberto!",
                        error: "Existe pedido(s) aberto."
                    }
                );
            }

            const oldBoxDay = await boxDayRepository.findOne({
                where: { isOpen: true, fkPlatform: platform.id }
            });

            if (oldBoxDay) {
                return response.status(404).json(
                    {
                        message: "Já existe um caixa aberto!",
                        error: "Existe um caixa aberto."
                    }
                );
            }

            const boxDay: any = {
                fkPlatform: platform.id,
                createdBy: user.id,
            }

            await boxDayRepository.save(boxDay);

            return response.json(
                {
                    message: "Caixa salvo com sucesso!",
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
        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        try {

            const boxDayId: number = Number.parseInt(id);

            dataSource.transaction(async (transactionalEntityManager) => {

                const boxDayEntity = transactionalEntityManager.getRepository(BoxDayEntity);

                const boxDayOpen = await boxDayEntity.find({
                    where: { fkPlatform: platform.id, isOpen: true }
                });

                const oldBoxDay = await boxDayEntity.findOne({
                    where: { id: boxDayId, fkPlatform: platform.id }
                });

                if(boxDayOpen.length && !oldBoxDay.isOpen) {
                    return response.status(404).json(
                        {
                            message: "Somente um caixa pode ficar aberto!",
                            error: "Existem pedidos abertos."
                        }
                    );
                }

                const boxDay = {
                    isOpen: !oldBoxDay.isOpen,
                    updatedBy: user.id
                };

                const spendingMerger = boxDayEntity.merge(oldBoxDay, boxDay)

                await boxDayEntity.update(boxDayId, spendingMerger);

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
