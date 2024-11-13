import { ChargesEntity } from "../entity/ChargesEntity";


export const ChargesView = {

    get: (charges: Array<ChargesEntity>) => {

        return charges.map((charge: ChargesEntity) => {
            return {
                id: charge.id,
                isPay: charge.isPay,
                description: charge.description,
                payday: charge.payday,
                paidIn: charge.paidIn,
                value: charge.value,
                payer: charge.payer,
            } as ChargesEntity
        });

    },

}
