import { logger } from "@shared/logger/logger";
import { dataSource } from "../../../database/database";
import { CreatePlanDTO } from "../dto/CreatePlanDTO";
import { Plan, PlanEntity } from "../entities/PlanEntity";

export async function planSeed() {
    try {
        const planRepository = dataSource.getRepository(PlanEntity);
        
            const plans: CreatePlanDTO[] = [
                {
                    name: "Iniciante" as Plan,
                    monthValue: 99.9,
                    annualValue: 79.9,
                    maxTables: 8,
                    maxUsers: 4,
                    taxDelivery: 0.04,
                    maxBoxDay: 1,
                },
                {
                    name: "Profissional" as Plan,
                    monthValue: 149.9,
                    annualValue: 129.9,
                    maxTables: 20,
                    maxUsers: 8,
                    taxDelivery: 0.04,
                    maxBoxDay: 2,
                },
            ];
        
            for (const item of plans) {
                const exists = await planRepository.findOne({
                    where: {
                        name: item.name,
                    },
                });
        
                if (!exists) {
                    const plan = planRepository.create(item);
        
                    await planRepository.save(plan);
                }
            }
        
            logger.info("Planos criados");
        
    } catch (error) {
        logger.error({
            error,
            module: "seed plan",
        });
        throw new Error("Não foi possível criar os planos: " + error);
    }
}
