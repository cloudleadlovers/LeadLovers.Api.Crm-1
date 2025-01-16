export interface IInsertColumnRepository {
  insert(
    boardId: number,
    title: string,
    order: number,
    color: string
  ): Promise<number>;
}
