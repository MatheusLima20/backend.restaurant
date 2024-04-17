import { ProductEntity } from "../entity/ProductEntity";

export const ProductView = {
    get: (products: Array<ProductEntity>) => {
        return products.map((product) => {

            return {
                id: product.id,
                name: product.name,
                amount: product.amount,
                value: product.value,
                unitMeasurement: product.unitMeasurement,
            };
        });
    },
};
