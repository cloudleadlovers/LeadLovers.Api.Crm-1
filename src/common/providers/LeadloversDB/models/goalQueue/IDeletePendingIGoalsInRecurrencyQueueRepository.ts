export interface IDeletePendingIGoalsInRecurrencyQueueRepository {
  delete(boardId: number): Promise<void>;
}
