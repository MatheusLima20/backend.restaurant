import { logger } from "@shared/logger/logger";
import { dataSource } from "../../../database/database";
import { UserTypeEntity } from "../entities/UserTypeEntity";


export async function userTypeSeed() {
    try {
           const userTypeRepository = dataSource.getRepository(UserTypeEntity);
        
            const userTypes = [
                "SUPER",
                "ADM",
                "CUSTOMER",
                "WAITER",
                "DELIVERYMAN",
                "COOK",
            ];
        
            for (const name of userTypes) {
                const exists = await userTypeRepository.findOne({
                    where: {
                        name,
                    },
                });
        
                if (!exists) {
                    const userType = userTypeRepository.create({
                        name,
                    });
        
                    await userTypeRepository.save(userType);
                }
            }
        
            logger.info("Tipos de usuário criados");
        
    } catch (error) {
        logger.error({
            error,
            module: "seed user type",
        });
        throw new Error("Não foi possível criar tipos de usuário : " + error);
    }
}
