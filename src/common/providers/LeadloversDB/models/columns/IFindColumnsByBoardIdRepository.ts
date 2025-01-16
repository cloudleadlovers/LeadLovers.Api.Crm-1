import { Column } from './IFindColumnRepository';

export type ColumnFilter = {
  column: {
    in?: number[];
    notIn?: number[];
  };
};

export interface IFindColumnsByBoardIdRepository {
  find(boardId: number, filter?: ColumnFilter): Promise<Column[]>;
}
