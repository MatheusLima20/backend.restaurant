import { Request, Response } from "express";
import { AddressEntity } from "../entity/AddressEntity";
import { AddressView } from "../views/AddressView";
import { dataSource } from "../services/database/database";

export const AddressController = {
    getByUserId: async (request: Request, response: Response) => {
        const auth = request.auth;

        const user = auth.user;

        const platform = user.platform;

        const { id } = request.params;

        try {
            const addressRepository = dataSource.getRepository(AddressEntity);

            const address = await addressRepository.findOne({
                where: { fkUser: id as any, fkPlatform: platform.id as any },
                relations: ["fkState"],
            });

            if (!address) {
                response.status(404).send({
                    message: "Endereço não encontrado",
                });
                return;
            }

            const addressView = AddressView.getById(address);

            response.send({
                data: addressView,
                message: "Dados encontrados com sucesso!",
            });
            
        } catch (error) {
            response.status(404).send({
                message: error,
            });
        }
    },
};
