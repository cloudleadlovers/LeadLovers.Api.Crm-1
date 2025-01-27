export interface IFindCardByColumnIdAndLeadCodiRepository {
  find(columnId: number, leadCodi: number): Promise<number | undefined>;
}
