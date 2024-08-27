import { SpendingEntity } from "../entity/SpendingEntity";

export const SpendingView = {
    get: (spendings: Array<SpendingEntity>) => {

        const data: any[] = [];
        let total = 0;

        spendings.map((spending) => {

            const createdAt = spending.createdAt;

            const amount = spending.amount;

            const value = spending.value;

            data.push(
                {
                    id: spending.id,
                    name: spending.name,
                    unitMeasurement: spending.unitMeasurement,
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
