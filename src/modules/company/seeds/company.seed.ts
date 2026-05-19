import { logger } from "@shared/logger/logger";
import { dataSource } from "../../../services/database/database";
import { CompanyEntity } from "../entities/CompanyEntity";

export async function companySeed() {
    try {
        const companyRepository = dataSource.getRepository(CompanyEntity);

        const company = await companyRepository.find();
        console.log("empresas: " + company.length);
        const newCompany = companyRepository.create({
            cpfcnpj: "64897849889789",
            companyName: "Restaurante Beira Mar",
            corporateName: "Matheus Lima Dos Santos",
        });

        if (!company.length) {
            await companyRepository.save(newCompany);
            logger.info("Empresa criada");
        } else {
            logger.info("Seed empresa finalizado.");
        }
    } catch (error) {
        logger.error({
            error,
            module: "seed company",
        });
        throw new Error("Não foi possível criar a empresa : " + error);
    }
}
