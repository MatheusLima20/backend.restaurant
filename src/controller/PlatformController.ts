import { Request, Response } from "express";
import { CompanyEntity } from "../entity/CompanyEntity";
import { PlatformEntity } from "../entity/PlatformEntity";
import { stringFormatter } from "../utils/formatter/string/string.formatter";
import { dataSource } from "../services/database/database";


export const PlatformController = {

    getByCNPJ: async (request: Request, response: Response) => {

        const paramsCNPJ = request.params;

        const cnpj: string = stringFormatter.onlyNumberString(paramsCNPJ.cnpj);

        try {

            const platformEntity = dataSource.getRepository(PlatformEntity);
            const companyEntity = dataSource.getRepository(CompanyEntity);

            const company = await companyEntity.findOne({
                where: {
                    cpfcnpj: cnpj
                }
            });

            if (!company) {
                response.status(404).json({
                    message: "Empresa não encontrada."
                });
                return;
            }

            const platform = await platformEntity.findOne({
                where: {
                    fkCompany: company
                }
            });

            if (!platform) {
                response.status(404).json({
                    message: "Plataforma não encontrada."
                });
                return;
            }

            response.json({
                message: "Plataforma encontrada com sucesso!",
                data: {
                    platformId: platform.id,
                    platformName: platform.name,
                },
            });
            return;

        } catch (error) {
            response.status(404).json({
                message: error
            });
            return;
        }

    },

};
