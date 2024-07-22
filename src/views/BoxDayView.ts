import { BoxDayEntity } from "../entity/BoxDayEntity";


export const BoxDayView = {
    get: (boxDays: Array<BoxDayEntity>, totalBoxDay: number[]) => {

        return boxDays.map((boxDay, index) => {

            const startValue = boxDay.startValue;
            const total = totalBoxDay[index];

            const totalWithStartValue = total + startValue;
            const createdAt = boxDay.createdAt;

            return {
                id: boxDay.id,
                startValue: startValue,
                isOpen: boxDay.isOpen,
                createdAt: createdAt,
                totalWithStartValue: totalWithStartValue,
                totalBoxDay: total
            };
        });
    },
};
