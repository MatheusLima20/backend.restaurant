import { Request, Response } from "express";
import { AddressEntity } from "../entity/AddressEntity";
import { AddressView } from "../views/AddressView";
import { dataSource } from "../data.source";


export const AddressController = {

    getByUserId: async (request: Request, response: Response) => {

        const auth = request.auth;

        const user = auth.user;

        const platform = user.platform;

        const { id } = request.params;

        try {

            const addressRepository = dataSource.getRepository(AddressEntity);

            const address = await addressRepository.findOne({
                where: { fkUser: id as any, fkPlatform: platform.id as any},
                relations: ["fkState"]
            });

            if (!address) {
                return response.status(404).json({
                    message: "Endereço não encontrado"
                });
            }

            const addressView = AddressView.getById(address);

            return response.json({
                data: addressView,
                message: "Dados encontrados com sucesso!"
            });

        } catch (error) {

            return response.status(404).json({
                message: error
            });

        }

    }

}
