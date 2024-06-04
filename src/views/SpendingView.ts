import dayjs = require("dayjs");
import { SpendingEntity } from "../entity/SpendingEntity";

export const SpendingView = {
    get: (spendings: Array<SpendingEntity>) => {

        const data: any[] = [];
        let total = 0;

        spendings.map((spending) => {

            const createdAt = dayjs(spending.createdAt).format('DD/MM/YYYY HH:mm:ss');

            const amount = spending.amount;

            const value = spending.value;

            data.push(
                {
                    id: spending.id,
                    name: spending.name,
                    amount: amount,
                    value: value,
                    createdAt: createdAt,
                }
            );
            total += amount * value;

        });
        return {
            spending: data,
            total: total
        }
    },
};
