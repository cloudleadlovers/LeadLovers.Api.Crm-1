import { CRMRule } from '@common/shared/enums/CRMRules';

export type InsertBoardParams = {
  usuaSistCodi: number;
  logo: string;
  title: string;
  description: string;
  goal: number;
  goalRecurrency?: number;
  goalRecurrencyStartIn?: Date;
  goalRecurrencyFinishIn?: Date;
  rule: CRMRule;
};

export interface IInsertBoardRepository {
  insert(params: InsertBoardParams): Promise<number>;
}
