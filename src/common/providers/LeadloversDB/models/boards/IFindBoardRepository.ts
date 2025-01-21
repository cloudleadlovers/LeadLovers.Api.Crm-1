export type Board = {
  id: number;
  userId: number;
  logo: string;
  title: string;
  goal: number;
  rule: 'all-crm' | 'only-one-per-column' | 'only-one-in-crm';
  cardQuantity: number;
  totalCardValue: number;
  createdAt: Date;
};

export interface IFindBoardRepository {
  find(
    boardId: number
  ): Promise<Omit<Board, 'cardQuantity' | 'totalCardValue'> | undefined>;
}
