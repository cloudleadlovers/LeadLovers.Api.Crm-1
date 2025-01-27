import { Pagination, ResultPaginated } from '@common/shared/types/Pagination';

export type Card = {
  id: number;
  usuaSistCodi: number | null;
  columnId: number;
  leadCodi: number | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  commercialPhone: string | null;
  score: number | null;
  tags: string | null;
  status: number;
  value: number;
  dealStatus: number | null;
  dealScheduleDate: Date | null;
  position: number;
  responsibleId: number | null;
  responsibleName: string | null;
  responsibleIcon: string | null;
  createdAt: Date;
  gainedAt: Date | null;
  losedAt: Date | null;
};

export type CardFilter = {
  name?: string;
  createInitialDate?: string;
  createEndDate?: string;
  closedInitialDate?: string;
  closedEndDate?: string;
  responsibles?: {
    in?: number[];
    notIn?: number[];
    isNull?: boolean;
  };
  stateCards?: ('OPENED' | 'LOSED' | 'GAINED')[];
  value?: {
    greaterThan?: number;
    lessThan?: number;
    equalTo?: number;
  };
};

export interface IFindCardsByColumnIdRepository {
  find(
    columnId: number,
    pagination?: Pagination,
    filters?: CardFilter
  ): Promise<ResultPaginated<Card>>;
}
