import { UnitMeasurementEntity } from "../entities/UnitMeasurementEntity";


export const UnitMeasurementView = {

    get: (unitsMeasurement: Array<UnitMeasurementEntity>) => {

        return unitsMeasurement.map((unitMeasurement: UnitMeasurementEntity) => {
            return {
                id: unitMeasurement.id,
                name: unitMeasurement.name,
                description: unitMeasurement.description,
            }
        });

    },

}
