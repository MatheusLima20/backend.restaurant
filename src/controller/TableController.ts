import { Request, Response } from "express";
import { dataSource } from "../../ormconfig";
import { TableEntity } from "../entity/TableEntity ";
import { TableView } from "../views/TableView";

export const TableController = {

    get: async (request: Request, response: Response) => {

        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        try {
            const tableRepository = dataSource.getRepository(TableEntity);

            const table = await tableRepository.find({
                where: { fkPlatform: platform.id },
            });

            const tableView = TableView.get(table)

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

            const table = await tableRepository.find({
                where: { fkPlatform: platform.id }
            });

            const name = "Mesa: " + (table.length + 1);

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
        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        try {

            const boxDayId: number = Number.parseInt(id);

            dataSource.transaction(async (transactionalEntityManager) => {

                const boxDayEntity = transactionalEntityManager.getRepository(TableEntity);

                const oldBoxDay = await boxDayEntity.findOne({
                    where: { id: boxDayId, fkPlatform: platform.id }
                });

                const boxDay = {
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
