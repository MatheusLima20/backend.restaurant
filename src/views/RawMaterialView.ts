import { RawMaterialEntity } from "../entity/RawMaterialEntity";


export const RawMaterialView = {

    getById: (rawMaterials: Array<RawMaterialEntity>) => {

        return rawMaterials.map((rawMaterial: RawMaterialEntity) => {
            return {
                id: rawMaterial.id,
                productId: rawMaterial.fkProduct.id,
                rawMaterialId: rawMaterial.fkRawMaterial.id,
                amount: rawMaterial.amount,
            }
        });

    },

}
