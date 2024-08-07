import { RawMaterialEntity } from "../entity/RawMaterialEntity";


export const RawMaterialView = {

    getById: (rawMaterials: Array<RawMaterialEntity>) => {

        return rawMaterials.map((rawMaterial: RawMaterialEntity) => {
            return {
                id: rawMaterial.id,
                productId: rawMaterial.fkProduct.id,
                productName: rawMaterial.fkProduct.name,
                materialId: rawMaterial.fkRawMaterial.id,
                materialName: rawMaterial.fkRawMaterial.name,
                amount: rawMaterial.amount,
            }
        });

    },

}
