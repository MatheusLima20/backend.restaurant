import { TotalBoxday } from "../@types/boxday";
import { BoxDayEntity } from "../entity/BoxDayEntity";


export const BoxDayView = {
    get: (boxDays: Array<BoxDayEntity>, totalBoxDay: TotalBoxday[]) => {

        return boxDays.map((boxDay, index) => {

            const startValue = boxDay.startValue;
            const total = totalBoxDay[index];
            
            const totalWithdrawals = total.totalWithdrawals;
            const totalReinforcement = total.totalReinforcement;
            const grandTotal = (total.totalOrders + startValue + totalReinforcement) - totalWithdrawals;
            const createdAt = boxDay.createdAt;
            
            return {
                id: boxDay.id,
                startValue: startValue,
                isOpen: boxDay.isOpen,
                createdAt: createdAt,
                grandTotal: grandTotal,
                totalWithdrawals: totalWithdrawals,
                totalBoxDay: total.totalOrders,
                totalReinforcement: totalReinforcement
            };
        });
    },
};
