import { Pagination, ResultPaginated } from '@common/shared/types/Pagination';

export type Model = {
  id: number;
  name: string;
};

export interface IFindDefaultModelsByFuniCodiRepository {
  find(
    funiCodi: number,
    pagination: Pagination
  ): Promise<ResultPaginated<Model>>;
}
