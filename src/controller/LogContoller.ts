import { Request, Response } from "express";
import { User } from "../@types/express";
import { ContentEntity } from "../entity/ContentEntity";
import { dataSource } from "../services/database/database";
import { Between } from "typeorm";
import { LogView } from "../views/LogView";

export type LogTag = "Salvo" | "Alterado" | "Excluido";

export const LogController = {
    store: async (user: User, title: string, message: string, tag: LogTag) => {
        const platform = user.platform;

        const contentRepository = dataSource.getRepository(ContentEntity);

        await contentRepository.save({
            fkPlatform: platform.id,
            createdBy: user.id,
            contentType: "LOG",
            tag: tag,
            title: title,
            text: message,
        });
    },

    get: async (request: Request, response: Response) => {

        const { start, end } = request.params;

        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        try {

            const contentRepository = dataSource.getRepository(ContentEntity);

            const contentEntity = await contentRepository.find({
                where: {
                    fkPlatform: platform.id,
                    contentType: 'LOG',
                    createdAt: Between(start, end) as any,
                }
            });

            const logView = LogView.get(contentEntity);

            return response.json({
                data: logView,
                message: "Dados encontrados com sucesso.",
            });
        } catch (error) {
            return response.status(404).json({
                message: error,
                error,
            });
        }
    },
};
