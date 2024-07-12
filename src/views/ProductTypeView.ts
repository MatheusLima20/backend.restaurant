import { ProductTypeEntity } from "../entity/ProductTypeEntity";


export const ProductTypeView = {

    get: (productTypes: Array<ProductTypeEntity>) => {

        return productTypes.map((productType: ProductTypeEntity) => {
            return {
                id: productType.id,
                name: productType.name,
            }
        });

    },

}
