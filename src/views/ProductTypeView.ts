import { ProductTypeEntity } from "../entity/ProductTypeEntity";


export const ProductTypeView = {

    get: (ProductTypes: Array<ProductTypeEntity>) => {

        return ProductTypes.map((productType: ProductTypeEntity) => {
            return {
                id: productType.id,
                name: productType.name,
            }
        });

    },

}
