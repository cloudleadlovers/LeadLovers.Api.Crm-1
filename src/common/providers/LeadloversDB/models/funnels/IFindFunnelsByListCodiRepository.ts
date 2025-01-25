import { Pagination, ResultPaginated } from '@common/shared/types/Pagination';

export type Funnel = {
  id: number;
  name: string;
};

export interface IFindFunnelsByListCodiRepository {
  find(
    listCodi: number,
    pagination: Pagination
  ): Promise<ResultPaginated<Funnel>>;
}
