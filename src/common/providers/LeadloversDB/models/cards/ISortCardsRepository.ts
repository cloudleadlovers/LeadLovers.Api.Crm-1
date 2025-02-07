export interface ISortCardsRepository {
  sort(columnId: number): Promise<void>;
}
