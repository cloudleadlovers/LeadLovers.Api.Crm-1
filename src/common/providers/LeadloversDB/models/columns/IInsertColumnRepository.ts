export interface IInsertColumnRepository {
  insert(boardId: number, title: string, order: number): Promise<void>;
}
