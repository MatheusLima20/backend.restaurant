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

    getProfit: (rawMaterials: Array<RawMaterialEntity>) => {

        const newArray: any[] = [];
        let totalRawMaterial = 0;

        rawMaterials.map((rawMaterial: RawMaterialEntity) => {
            const productName = rawMaterial.fkProduct.name;
            const productType = rawMaterial.fkProduct.fkProductType.name;
            const productValue = rawMaterial.fkProduct.value;
            const materialValue = rawMaterial.fkRawMaterial.value * rawMaterial.amount;

            const hasProduct = newArray.find((value) => value.productName === productName);

            if (!hasProduct) {
                totalRawMaterial = 0;
                totalRawMaterial = materialValue + totalRawMaterial;
                const total = Number.parseFloat(totalRawMaterial.toFixed(2));
                const profit = productValue - total;
                newArray.push({
                    productName: productName,
                    productType: productType,
                    totalRawMaterial: total,
                    productValue: productValue,
                    profit: Number.parseFloat(profit.toFixed(2)),
                });

            } else {
                totalRawMaterial = materialValue + totalRawMaterial;
                const array = newArray.find((value) => value.productName === productName);
                const index = newArray.indexOf(array);
                const total = Number.parseFloat(totalRawMaterial.toFixed(2));
                const profit = productValue - total;
                newArray[index] = {
                    ...newArray[index],
                    productValue: productValue,
                    productType: productType,
                    totalRawMaterial: total,
                    profit: Number.parseFloat(profit.toFixed(2)),
                };
            }

        });

        return newArray;

    },

}
