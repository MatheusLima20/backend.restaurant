import dayjs = require("dayjs");
import { IDate } from "./interface/date.interface";

class DateClass implements IDate {
    dateTimebr(date: string | Date): string {
        const dateF = dayjs(date).format("DD/MM/YYYY HH:mm:ss");
        return dateF;
    }
    datebr(date: string | Date): string {
        const dateF = dayjs(date).format("DD/MM/YYYY");
        return dateF;
    }
}

export const dateFormatter = new DateClass();
