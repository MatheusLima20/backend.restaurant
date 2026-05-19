import { logger } from "@shared/logger/logger";
import { dataSource } from "../../../services/database/database";
import { ProductType, ProductTypeEntity } from "../entities/ProductTypeEntity";

export async function producTypeSeed() {
    try {
        const productTypeRepository = dataSource.getRepository(ProductTypeEntity);
        
            const productTypes: ProductType[] = [
                "PRATO",
                "GUARNIÇÃO",
                "BEBIDA",
                "SOBREMESA",
                "PETISCO",
                "ALMOÇO",
                "PF",
            ];
        
            for (const name of productTypes) {
                const exists = await productTypeRepository.findOne({
                    where: { name },
                });
        
                if (!exists) {
                    const type = productTypeRepository.create({
                        name,
                    });
        
                    await productTypeRepository.save(type);
                }
            }
        
            logger.info("Tipos de produto criados");
        
    } catch (error) {
        logger.error({
            error,
            module: "seed product",
        });
        throw new Error("Não foi possível criar tipos de produto: " + error);
    }
}
