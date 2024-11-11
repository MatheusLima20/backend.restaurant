export interface IDate {
    now(): string;

    generatePaydays(period: number, payday: number): string[];

    formatTimebr(date: string | Date): string;

    formatbr(date: string | Date): string;

    addDays(date: string | Date, days: number): string;

    removeDays(date: string | Date, days: number): string;
}
