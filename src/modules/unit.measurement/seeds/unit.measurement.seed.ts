import { logger } from "@shared/logger/logger";
import { dataSource } from "../../../services/database/database";
import { Unit, UnitMeasurementEntity } from "../entities/UnitMeasurementEntity";

export async function unitMeasurementSeed() {
    try {
           const measurementRepository = dataSource.getRepository(
                   UnitMeasurementEntity,
               );
           
               const measurements = [
                   {
                       name: "KG" as Unit,
                       description: "Quilo",
                   },
                   {
                       name: "g" as Unit,
                       description: "Gramas",
                   },
                   {
                       name: "L" as Unit,
                       description: "Litro",
                   },
                   {
                       name: "UN" as Unit,
                       description: "Unidade",
                   },
               ];
           
               for (const item of measurements) {
                   const exists = await measurementRepository.findOne({
                       where: {
                           name: item.name as Unit,
                           description: item.description,
                       },
                   });
           
                   if (!exists) {
                       const measurement = measurementRepository.create(item);
           
                       await measurementRepository.save(measurement);
                   }
               }
           
               logger.info("Unidades criadas");
        
    } catch (error) {
        logger.error({
            error,
            module: "seed unit measurement",
        });
        throw new Error("Não foi possível criar as unidades de medida : " + error);
    }
}
