import { statesSeed } from "@modules/states/seeds/states.seed";
import { planSeed } from "@modules/plan/seeds/plan.seed";
import { productTypeSeed } from "@modules/product.type/seeds/product.type.seed";
import { userTypeSeed } from "@modules/user.type/seeds/user.type.seed";
import { unitMeasurementSeed } from "@modules/unit.measurement/seeds/unit.measurement.seed";
import { companySeed } from "@modules/company/seeds/company.seed";
import { platformSeed } from "@modules/platform/seeds/platform.seed";
import { userSeed } from "@modules/user/seeds/user.seed";
import { addressSeed } from "@modules/address/seeds/address.seed";
import { logger } from "@shared/logger/logger";

export async function seed() {

    logger.info("Start Seeds");
    
    await statesSeed();

    await planSeed();

    await productTypeSeed();

    await userTypeSeed();

    await unitMeasurementSeed();

    await companySeed();

    await platformSeed();
    
    await userSeed();

    await addressSeed();

    
    logger.info("Ended Seeds!");
}
