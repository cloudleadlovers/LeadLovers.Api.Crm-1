export interface IInsertLeadUsuaSistTagRepository {
  insert(leadUsuaSistCodi: number, tagId: number): Promise<void>;
}
