export interface IRemoveLeadUsuaSistTagsByLeadUsuaSistCodiRepository {
  remove(leadUsuaSistCodi: number): Promise<{ tagId: number }[]>;
}
