import { logger } from "@shared/logger/logger";
import { dataSource } from "../../../database/database";
import { ProductType, ProductTypeEntity } from "../entities/ProductTypeEntity";

export async function productTypeSeed() {
    try {
        const productTypeRepository =
            dataSource.getRepository(ProductTypeEntity);

        const productTypes: ProductType[] = [
            "DISH",
            "SIDE DISH",
            "DRINK",
            "DESSERT",
            "SNACK",
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

        logger.info("Product Type Created");
    } catch (error) {
        logger.error({
            error,
            module: "seed product",
        });
        throw new Error("Error creating product type: " + error);
    }
}
