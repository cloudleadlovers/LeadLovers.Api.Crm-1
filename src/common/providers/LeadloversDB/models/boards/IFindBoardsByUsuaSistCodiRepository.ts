export type Board = {
  id: number;
  logo: string;
  title: string;
  goal: number;
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
