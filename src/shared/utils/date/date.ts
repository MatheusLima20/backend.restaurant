import dayjs = require("dayjs");
import { IDate } from "./interface/date.interface";

class DateClass implements IDate {
    now(): string {
        const date = dayjs().format("YYYY-MM-DD HH:mm:ss");
        return date;
    }

    spaceBetweenDays(start: string, end: string): number {
        const amountDays = dayjs(end).diff(start, "days");

        return amountDays;
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

    generatePaydays(
        months: number,
        payday: number,
        lastCharge?: string
    ): string[] {
        const payDate = `YYYY-MM-${payday}`;

        const freeMonth = 1;

        const startDateCharge = lastCharge ? lastCharge : this.now();

        let today = dayjs(startDateCharge).format("YYYY-MM-DD");
        
        const dates: string[] = [];

        for (let index = 0; index < months; index++) {
            const date = dayjs(today).add(freeMonth, "month").format(payDate);

            today = date;

            dates.push(dayjs(date).format(payDate));
        }
        return dates;
    }
}

export const dateFormat = new DateClass();
