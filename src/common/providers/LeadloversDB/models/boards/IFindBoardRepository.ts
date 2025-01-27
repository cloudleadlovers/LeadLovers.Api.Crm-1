import { CRMRule } from '@common/shared/enums/CRMRules';

export type Board = {
  id: number;
  userId: number;
  logo: string;
  title: string;
  goal: number;
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
