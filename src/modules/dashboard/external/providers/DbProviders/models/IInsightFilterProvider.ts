export type InsightFilter = {
  id: number;
  name: string;
  filters: FiltersJSON;
  userId: number;
  createdAt: Date;
};

export type DealStatus = 'OPENED' | 'LOSED' | 'GAINED';

export type FiltersJSON = {
  stateCards?: DealStatus[];
  createInitialDate?: string;
  createEndDate?: string;
  closedInitialDate?: string;
  closedEndDate?: string;
  responsibles?: { in: number[]; notIn: number[] };
};

export type CreateFilterParams = Pick<
  InsightFilter,
  'name' | 'filters' | 'userId'
>;

export type EditFilterParams = Partial<
  Pick<InsightFilter, 'name' | 'filters'>
> & { id: number };

export default interface IInsightFilterProvider {
  createFilter(params: CreateFilterParams): Promise<number>;
  deleteFilter(filterId: number): Promise<void>;
  editFilter(params: EditFilterParams): Promise<void>;
  findAllFiltersByUserId(userId: number): Promise<InsightFilter[]>;
}
