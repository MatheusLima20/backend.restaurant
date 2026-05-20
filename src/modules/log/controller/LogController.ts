import { Request, Response } from "express";
import { Like } from "typeorm";
import { User } from "../../../@types/express";
import { dataSource } from "../../../database/database";
import { ContentEntity } from "../../content/entities/ContentEntity";
import { LogView } from "../views/LogView";

export type LogTag = "Salvo" | "Modified" | "Cancelled" | "Deleted";

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

        const { date } = request.params;

        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        try {

            const contentRepository = dataSource.getRepository(ContentEntity);

            const contentEntity = await contentRepository.find({
                where: {
                    fkPlatform: platform.id,
                    contentType: 'LOG',
                    createdAt: Like(`%${date}%`) as any,
                },
                order: {
                    id: "DESC",
                }
            });

            const logView = LogView.get(contentEntity);

            response.send({
                data: logView,
                message: "Data finds success.",
            });
        } catch (error) {
            response.status(404).send({
                message: error,
                error,
            });
        }
    },
};
