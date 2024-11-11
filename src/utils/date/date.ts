import dayjs = require("dayjs");
import { IDate } from "./interface/date.interface";

class DateClass implements IDate {
    now(): string {
        const date = dayjs().format("DD/MM/YYYY HH:mm:ss");
        return date;
    }

    formatTimebr(date: string | Date): string {
        const dateF = dayjs(date).format("DD/MM/YYYY HH:mm:ss");
        return dateF;
    }

    formatbr(date: string | Date): string {
        const dateF = dayjs(date).format("DD/MM/YYYY");
        return dateF;
    }

    addDays(date: string | Date, days: number): string {
        const newDate = dayjs(date).add(days, "day").format("YYYY-MM-DD");

        return newDate;
    }

    removeDays(date: string | Date, days: number): string {
        const newDate = dayjs(date).subtract(days, "day").format("YYYY-MM-DD");

        return newDate;
    }

    generatePaydays(months: number, payday: number): string[] {
        const payDate = `YYYY-MM-${payday}`;

        const lessThenPayday = 30;

        const moreThenPayday = 60;

        let today = dayjs(this.now()).format("YYYY-MM-DD");

        const dates: string[] = [];

        for (let index = 0; index < months; index++) {
            const freeDays =
                dayjs(today).get("D") > payday
                    ? moreThenPayday
                    : lessThenPayday;

            const date = dayjs(today).add(freeDays, "day").format(payDate);

            today = date;

            dates.push(dayjs(date).format(payDate));
        }
        return dates;
    }
}

export const dateFormat = new DateClass();
