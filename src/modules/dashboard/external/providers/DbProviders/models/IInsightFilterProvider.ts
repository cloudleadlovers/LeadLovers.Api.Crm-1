import { InsightFiltersJSON } from '@modules/dashboard/shared/types/InsightFilter';

export type InsightFilter = {
  id: number;
  name: string;
  filters: InsightFiltersJSON;
  userId: number;
  createdAt: Date;
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
