import { IString } from "./interface/string.interface";

export class StringFormatter implements IString {
    onlyNumberFloat(value: string): number {
        const sValue = value;
        const onlyNumber = this.onlyNumberString(sValue);
        const toNumber = Number.parseFloat(onlyNumber);
        return toNumber;
    }
    onlyNumberInt(value: string): number {
        const sValue = value;
        const onlyNumber = this.onlyNumberString(sValue);
        const toNumber = Number.parseInt(onlyNumber);
        return toNumber;
    }
    onlyNumberString(value: string): string {
        const data: string = value.replace(/[^\d]+/g, "");
        return data;
    }
}

export const stringFormatter = new StringFormatter();
