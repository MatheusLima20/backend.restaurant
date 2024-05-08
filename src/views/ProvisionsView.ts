import { ProvisionsEntity } from "../entity/ProvisionsEntity";

export const ProductView = {
    get: (products: Array<ProvisionsEntity>) => {
        
        return products.map((product) => {

            return {
                id: product.id,
                name: product.name,
                amount: product.amount,
                value: product.value,
                unitMeasurement: product.fkUnitMeasurement.name,
                show: product.show,
                isActive: product.isActive
            };
        });
    },
};
