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

export type FindBoardsFilters = {
  createInitialDate?: string;
  createEndDate?: string;
};

export interface IFindBoardsByUsuaSistCodiRepository {
  find(usuaSistCodi: number, filter?: FindBoardsFilters): Promise<Board[]>;
}
