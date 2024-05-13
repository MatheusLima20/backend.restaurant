import dayjs = require("dayjs");
import { SpendingEntity } from "../entity/SpendingEntity";

export const SpendingView = {
    get: (spendings: Array<SpendingEntity>) => {

        let total;
        
        return spendings.map((spending) => {

            const createdAt = dayjs(spending.createdAt).format('DD/MM/YYYY HH:mm:ss');

            const amount = spending.amount;

            const value = spending.value ;

            return {
                id: spending.id,
                name: spending.name,
                amount: amount,
                value: value,
                createdAt: createdAt,
            };
            
        });
    },
};
