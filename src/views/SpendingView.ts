import dayjs = require("dayjs");
import { SpendingEntity } from "../entity/SpendingEntity";

export const SpendingView = {
    get: (spendings: Array<SpendingEntity>) => {
        
        return spendings.map((spending) => {

            const createdAt = dayjs(spending.createdAt).format('DD/MM/YYYY HH:mm:ss');

            return {
                id: spending.id,
                name: spending.name,
                amount: spending.amount,
                value: spending.value,
                createdAt: createdAt,
            };
            
        });
    },
};
