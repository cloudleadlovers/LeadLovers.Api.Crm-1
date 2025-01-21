export interface IRemoveCardNotificationRepository {
  remove(cardId: number): Promise<void>;
}
