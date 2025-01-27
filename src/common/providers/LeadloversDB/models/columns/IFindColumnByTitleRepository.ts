import { Column } from './IFindColumnRepository';

export interface IFindColumnByTitleRepository {
  find(boardId: number, title: string): Promise<Pick<Column, 'id'> | undefined>;
}
