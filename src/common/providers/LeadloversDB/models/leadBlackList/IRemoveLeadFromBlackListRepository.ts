export interface IRemoveLeadFromBlackListRepository {
  remove(leadEmail: string): Promise<void>;
}
