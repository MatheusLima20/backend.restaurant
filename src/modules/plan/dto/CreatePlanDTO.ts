import { PlanEntity } from "../entities/PlanEntity";

export type CreatePlanDTO = Omit<
  PlanEntity,
  'id' | 'createdAt' | 'updatedAt'
>;