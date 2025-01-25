import { Pagination, ResultPaginated } from '@common/shared/types/Pagination';

export type List = {
  id: number;
  name: string;
};

export interface IFindListsByUsuaSistCodiRepository {
  find(
    usuaSistCodi: number,
    pagination: Pagination
  ): Promise<ResultPaginated<List>>;
}
