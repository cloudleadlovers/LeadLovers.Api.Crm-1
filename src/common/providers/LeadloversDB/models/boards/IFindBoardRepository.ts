import { CRMRule } from '@common/shared/enums/CRMRules';

export type Board = {
  id: number;
  userId: number;
  logo: string;
  title: string;
  description: string;
  goal: number;
  goalRecurrency: number;
  goalRecurrencyStartIn: Date;
  goalRecurrencyFinishIn: Date;
  rule: CRMRule;
  cardQuantity: number;
  totalCardValue: number;
  createdAt: Date;
};

export interface IFindBoardRepository {
  find(
    boardId: number
  ): Promise<Omit<Board, 'cardQuantity' | 'totalCardValue'> | undefined>;
}
