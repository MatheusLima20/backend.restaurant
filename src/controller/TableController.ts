import { Request, Response } from "express";
import { dataSource } from "../data.source";
import { TableEntity } from "../entity/TableEntity ";
import { TableView } from "../views/TableView";
import { OrderEntity } from "../entity/OrdersEntity";
import { PlatformEntity } from "../entity/PlatformEntity";

export const TableController = {

    get: async (request: Request, response: Response) => {

        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        try {
            const tableRepository = dataSource.getRepository(TableEntity);
            const orderEntity = dataSource.getRepository(OrderEntity);

            const table = await tableRepository.find({
                where: { fkPlatform: platform.id, isActive: true },
            });

            const isOcuppied: boolean[] = [];

            var amountPendings: OrderEntity[] = [];

            if (table.length) {

                for (let index = 0; index < table.length; index++) {
                    const element = table[index];
                    const orders = await orderEntity.find({
                        where: {
                            fkPlatform: platform.id,
                            fkTable: element.id,
                            isOpen: true,
                            isCancelled: false,
                        }
                    });
                    isOcuppied.push(orders.length !== 0);
                    const pendings = orders.filter((value) => value.status === "pendente");

                    amountPendings = amountPendings.concat(pendings);
                }

            }

            const tableView = TableView.get(table, isOcuppied, amountPendings);

            return response.json({
                data: tableView,
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

            const tableRepository = dataSource.getRepository(TableEntity);
            const platformRepository = dataSource.getRepository(PlatformEntity);

            const platformEntity = await platformRepository.findOne({
                where: {
                    id: platform.id,
                },
                relations: {
                    fkPlan: true,
                }
            });

            const plan = platformEntity.fkPlan;

            const maxTablesPlan = plan.maxTables;

            const table = await tableRepository.find({
                where: { fkPlatform: platform.id, isActive: true }
            });

            const totalTables = table.length;

            const moreThanMaxTables = totalTables >= maxTablesPlan;

            if (moreThanMaxTables) {
                return response.status(404).json(
                    {
                        message: "Máximo de mesas foi atingido."
                    }
                );
            }

            const name = "Mesa: " + (totalTables + 1);

            const tableNew: any = {
                name: name,
                fkPlatform: platform.id,
                createdBy: user.id,
            }

            await tableRepository.save(tableNew);

            return response.json(
                {
                    message: "Mesa salva com sucesso!",
                }
            );


        } catch (error) {

            return response.status(404).json(
                { message: "Erro ao cadastrar mesa!", error }
            );

        }

    },

    patch: async (request: Request, response: Response) => {

        const { id } = request.params;
        const body = request.body;
        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        const name = body.name;
        const isActive = body.isActive;

        try {

            const tableId: number = Number.parseInt(id);

            dataSource.transaction(async (transactionalEntityManager) => {

                const tableEntity = transactionalEntityManager.getRepository(TableEntity);
                const orderEntity = transactionalEntityManager.getRepository(OrderEntity);

                const oldTable = await tableEntity.findOne({
                    where: { id: tableId, fkPlatform: platform.id }
                });

                const ordersTable = await orderEntity.find({
                    where: {
                        fkTable: tableId,
                        fkPlatform: platform.id,
                        isCancelled: false,
                        isOpen: true,
                    }
                });

                if (!isActive && ordersTable.length !== 0) {
                    return response.status(404).json(
                        {
                            message: "Existe(m) pedido(s) aberto(s) na mesa.",
                            error: "Mesa"
                        }
                    );
                }

                const table = {
                    name: name,
                    isActive: isActive,
                    updatedBy: user.id
                };

                const spendingMerger = tableEntity.merge(oldTable, table)

                await tableEntity.update(tableId, spendingMerger);

                return response.json({
                    message: "Mesa atualizada com sucesso!"
                });

            });


        } catch (error) {

            return response.status(404).json(
                {
                    message: "Erro ao salvar mesa.", error: error
                }
            );

        }

    },

};
