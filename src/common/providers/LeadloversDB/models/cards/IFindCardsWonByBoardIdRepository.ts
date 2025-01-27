import { Pagination, ResultPaginated } from '@common/shared/types/Pagination';
import { PipelineReportsFilters } from '../insights/IFindConversionRateGraphDataRepository';
import { Card } from './IFindCardsByColumnIdRepository';

export interface IFindCardsWonByBoardIdRepository {
  find(
    boardId: number,
    pagination: Pagination,
    filters?: PipelineReportsFilters
  ): Promise<
    ResultPaginated<
      Pick<
        Card,
        | 'id'
        | 'name'
        | 'email'
        | 'phone'
        | 'value'
        | 'responsibleId'
        | 'responsibleName'
        | 'createdAt'
        | 'gainedAt'
      >
    >
  >;
}
