export interface IDeletePendingItemsRepository {
  delete(boardId: number): Promise<void>;
}
