import { BoxDayEntity } from "../entity/BoxDayEntity";
import dayjs = require("dayjs");

export const BoxDayView = {
    get: (boxDays: Array<BoxDayEntity>, totalBoxDay: number []) => {
        
        return boxDays.map((boxDay, index) => {

            const startValue = boxDay.startValue;
            const total = totalBoxDay[index];

            const totalWithStartValue = total +  startValue;
            const createdAt = dayjs(boxDay.createdAt).format('DD/MM/YYYY HH:mm:ss');
            
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
