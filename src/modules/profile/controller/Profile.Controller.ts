import { Request, Response } from "express";
import { ProfileView } from "../views/ProfileView";
import { dataSource } from "../../../services/database/database";
import { ProfileEntity } from "../entities/ProfileEntity";

export const ProfileController = {
    getByUserId: async (request: Request, response: Response) => {
        const { userId } = request.params;

        try {
            const profileRepository = dataSource.getRepository(ProfileEntity);

            const profile = await profileRepository.findOne({
                where: {
                    fkUser: Number.parseInt(userId) as any,
                },
            });

            if (!profile) {
                response.status(404).send({
                    message: "Perfil não encontrado.",
                    error: "Error"
                });
                return;
            }

            const profileView = ProfileView.getByUserId(profile);
            response.send({
                message: "Prefil encontrado com sucesso!",
                data: profileView,
            });
        } catch (error) {
            response.status(404).send({
                message: error,
            });
        }
    },
};
