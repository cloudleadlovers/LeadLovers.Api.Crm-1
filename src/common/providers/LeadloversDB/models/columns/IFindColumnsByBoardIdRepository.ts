export type Column = {
  id: number;
  boardId: number;
  name: string;
  color: string;
  order: number;
  amountCards: number;
  earnedRevenue: number;
  createdAt: Date;
};

export type ColumnFilter = {
  column: {
    in?: number[];
    notIn?: number[];
  };
};

export interface IFindColumnsByBoardIdRepository {
  find(boardId: number, filter?: ColumnFilter): Promise<Column[]>;
}
