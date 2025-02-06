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
    getPlates: (products: Array<ProvisionsEntity>) => {

        return products.map((product) => {

            return {
                id: product.id,
                name: product.name,
                amount: product.amount,
                value: product.value,
                productType: product.fkProductType.name,
                show: product.show,
                toCook: product.toCook,
                isActive: product.isActive,
                createdAt: product.createdAt
            };
        });
    },

    store: (product: ProvisionsEntity) => {

        return {
            id: product.id,
        };
    },
};
