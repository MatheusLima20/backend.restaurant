export interface IMath {
    valueDays(
        totalBill: number,
        totalDays: number,
        usedDays: number
    ): number;
}
