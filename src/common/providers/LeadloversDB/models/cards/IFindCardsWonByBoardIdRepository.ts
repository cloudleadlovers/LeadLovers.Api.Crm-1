import {
  Pagination,
  PipelineReportsFilters
} from '../insights/IFindConversionRateGraphDataRepository';

export type Card = {
  id: number;
  columnId: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  value: number;
  responsibleId: number | null;
  responsibleName: string | null;
  createdAt: Date;
  gainedAt: Date;
};

export type FindCardsWonPaginatedResult = {
  cards: Card[];
  nextCursor?: number;
};

export interface IFindCardsWonByBoardIdRepository {
  find(
    boardId: number,
    pagination: Pagination,
    filters?: PipelineReportsFilters
  ): Promise<FindCardsWonPaginatedResult>;
}
