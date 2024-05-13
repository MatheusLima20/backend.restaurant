import { BoxDayEntity } from "../entity/BoxDayEntity";
import dayjs = require("dayjs");

export const BoxDayView = {
    get: (boxDays: Array<BoxDayEntity>, totalBoxDay: number []) => {
        
        return boxDays.map((boxDay, index) => {

            const createdAt = dayjs(boxDay.createdAt).format('DD/MM/YYYY HH:mm:ss');
            
            return {
                id: boxDay.id,
                isOpen: boxDay.isOpen,
                createdAt: createdAt,
                totalBoxDay: totalBoxDay[index]
            };
        });
    },
};
