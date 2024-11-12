import { IMath } from "./interface/math.interface";

class MathClass implements IMath {
    valueDays(totalBill: number, totalDays: number, usedDays: number): number {
        const bill = totalBill;

        const days = totalDays;

        const amountDays = usedDays;

        const amountPerDay = bill / days;

        const priceDays = amountPerDay * amountDays;

        const fixedNumber = Number.parseFloat(priceDays.toFixed(2));

        return fixedNumber;
    }
}

export const mathClass = new MathClass();
