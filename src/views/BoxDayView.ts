import { BoxDayEntity } from "../entity/BoxDayEntity";
import dayjs = require("dayjs");

export const BoxDayView = {
    get: (boxDays: Array<BoxDayEntity>) => {
        
        return boxDays.map((boxDay) => {

            const createdAt = dayjs(boxDay.createdAt).format('DD/MM/YYYY HH:mm:ss');

            return {
                id: boxDay.id,
                createdAt: createdAt,
            };
        });
    },
};
