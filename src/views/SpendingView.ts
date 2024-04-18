import { SpendingEntity } from "../entity/SpendingEntity";

export const SpendingView = {
    get: (spendings: Array<SpendingEntity>) => {
        
        return spendings.map((spending) => {

            return {
                id: spending.id,
                name: spending.name,
                amount: spending.amount,
                value: spending.value,
            };
            
        });
    },
};
