import { ChargesEntity } from "../../entity/ChargesEntity";

export type ChargesType =
    | "WITHDRAWALBOXDAY"
    | "REINFORCEMENTBOXDAY"
    | "MONTHLYFEE";

export type ChargesStore = Pick<
    ChargesEntity,
    "type" | "value" | "description" | "isPay" | "platform" | "fkBoxDay"
>;
