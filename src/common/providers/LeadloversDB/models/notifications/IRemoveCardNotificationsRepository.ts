export interface IRemoveCardNotificationsRepository {
  remove(cardIds: number[]): Promise<void>;
}
