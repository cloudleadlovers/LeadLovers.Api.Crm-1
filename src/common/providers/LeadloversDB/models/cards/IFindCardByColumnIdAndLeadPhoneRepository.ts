export interface IFindCardByColumnIdAndLeadPhoneRepository {
  find(columnId: number, leadPhone: string): Promise<number | undefined>;
}
