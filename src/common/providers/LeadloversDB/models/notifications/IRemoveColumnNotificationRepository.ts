export interface IRemoveColumnNotificationRepository {
  remove(columnId: number): Promise<void>;
}
