import { Request, Response } from "express";
import { CompanyEntity } from "../entity/CompanyEntity";
import { PlatformEntity } from "../entity/PlatformEntity";
import { StringFormatter } from "../utils/string.formatter/string.formatter";
import { dataSource } from "../services/database/database";


export const PlatformController = {

    getByCNPJ: async (request: Request, response: Response) => {

        const paramsCNPJ = request.params;

        const cnpj: string = StringFormatter.OnlyNumber(paramsCNPJ.cnpj);

        try {

            const platformEntity = dataSource.getRepository(PlatformEntity);
            const companyEntity = dataSource.getRepository(CompanyEntity);

            const company = await companyEntity.findOne({
                where: {
                    cpfcnpj: cnpj
                }
            });

            if (!company) {
                return response.status(404).json({
                    message: "Empresa não encontrada."
                });
            }

            const platform = await platformEntity.findOne({
                where: {
                    fkCompany: company
                }
            });

            if (!platform) {
                return response.status(404).json({
                    message: "Plataforma não encontrada."
                });
            }

            return response.json({
                message: "Plataforma encontrada com sucesso!",
                data: {
                    platformId: platform.id,
                    platformName: platform.name,
                },
            });

        } catch (error) {
            return response.status(404).json({
                message: error
            });
        }

    },

};
