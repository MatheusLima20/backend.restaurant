import { Request, Response } from "express";
import { dataSource } from "../data.source";
import { RawMaterialEntity } from "../entity/RawMaterialEntity";
import { RawMaterialView } from "../views/RawMaterialView";


export const RawMaterialController = {

    get: async (request: Request, response: Response) => {

        const { id } = request.params;
        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        try {

            const rawMaterialEntity = dataSource.getRepository(RawMaterialEntity);

            const rawMaterial = await rawMaterialEntity.find({
                where: {
                    fkPlatform: platform.id
                },
                relations: {
                    fkProduct: true,
                    fkRawMaterial: true,
                }
            });

            const rawMaterialView = RawMaterialView.get(rawMaterial);

            return response.json({
                data: rawMaterialView,
                message: "Dados encontrados com sucesso.",
            });

        } catch (error) {
            return response.status(404).json({
                message: error,
                error
            });
        }

    }

}
