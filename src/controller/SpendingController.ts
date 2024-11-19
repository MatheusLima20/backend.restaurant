import { Request, Response } from "express";
import { dataSource } from "../services/database/database";
import { SpendingEntity } from "../entity/SpendingEntity";
import { SpendingView } from "../views/SpendingView";
import { Like } from "typeorm";
import dayjs = require("dayjs");

export const SpendingController = {
    get: async (request: Request, response: Response) => {
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
            const spendingRepository = dataSource.getRepository(SpendingEntity);

            const spending = await spendingRepository.find({
                where: {
                    fkPlatform: platform.id,
                    createdAt: Like(`%${date}%`) as any,
                },
                order: { createdAt: "DESC" },
            });

            const spendingView = SpendingView.get(spending);

            response.send({
                data: spendingView,
                message: "Dados encontrados com sucesso.",
            });
        } catch (error) {
            response.status(404).send({
                message: error,
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
            response.status(404).send({
                message: "Usuário sem permissão.",
            });
            return;
        }

        try {
            const spendingEntity = dataSource.getRepository(SpendingEntity);

            const spending = {
                name: body.name,
                value: body.value,
                amount: body.amount,
                unitMeasurement: body.unitMeasurement,
                fkPlatform: platform.id,
                createdBy: user.id,
            };

            await spendingEntity.save(spending);

            response.send({
                message: "Gastos salvos com sucesso!",
            });
        } catch (error) {
            response.status(404).send({
                message: "Erro ao salvar gastos",
                error: error,
            });
        }
    },

    patch: async (request: Request, response: Response) => {
        const { id } = request.params;

        const body = request.body;

        const auth = request.auth;
        const user = auth.user;

        const userType = user.userType;

        if (userType !== "SUPER") {
            response.status(404).send({
                message: "Usuário sem permissão.",
            });
            return;
        }

        try {
            dataSource.transaction(async (transactionalEntityManager) => {
                const spendingEntity =
                    transactionalEntityManager.getRepository(SpendingEntity);

                const spendingId: number = Number.parseInt(id);

                const spending = {
                    name: body.name,
                    value: body.value,
                    unitMeasurement: body.unitMeasurement,
                    amount: body.amount,
                    updatedBy: user.id,
                    updatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                };

                const oldSpending = await spendingEntity.findOne({
                    where: { id: spendingId },
                });

                const spendingMerger = spendingEntity.merge(
                    oldSpending,
                    spending
                );

                await spendingEntity.update(spendingId, spendingMerger);

                response.send({
                    message: "Gastos alterados com sucesso!",
                });
            });
        } catch (error) {
            response.status(404).send({
                message: "Erro ao salvar gastos",
                error: error,
            });
        }
    },
};
