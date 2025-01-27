import { CRMRule } from '@common/shared/enums/CRMRules';

export type InsertBoardParams = {
  usuaSistCodi: number;
  logo: string;
  title: string;
  goal: number;
  rule: CRMRule;
};

export interface IInsertBoardRepository {
  insert(params: InsertBoardParams): Promise<number>;
}
