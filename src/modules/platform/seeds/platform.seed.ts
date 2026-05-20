import { CompanyEntity } from "@modules/company/entities/CompanyEntity";
import { dataSource } from "../../../database/database";
import { PlatformEntity } from "../entities/PlatformEntity";
import { PlanEntity } from "@modules/plan/entities/PlanEntity";
import { logger } from "@shared/logger/logger";

export async function platformSeed() {
    try {
        const platformRepository = dataSource.getRepository(PlatformEntity);
        const companyRepository = dataSource.getRepository(CompanyEntity);

        const [platform] = await platformRepository.find({ take: 1 });
        const [company] = await companyRepository.find({ take: 1 });

        if (!company) {
            throw new Error("Empresa não encontrada");
        }

        const planEntity = dataSource.getRepository(PlanEntity);

        const plan = await planEntity.findOne({
            where: {
                name: "Profissional",
            },
        });

        if (!plan) {
            throw new Error("Plano não encontrado");
        }

        const objectPlatform = {
            name: "Matheus Restaurante",
            fkPlan: plan,
            fkCompany: company,
        };

        if (!platform) {
            const newPlatform: PlatformEntity =
                platformRepository.create(objectPlatform);

            await platformRepository.save(newPlatform);
        }

        logger.info("Platform criada");
    } catch (error) {
        logger.error({
            error,
            module: "seed platform",
        });
        throw new Error("Não foi possível criar a plataforma : " + error);
    }
}
