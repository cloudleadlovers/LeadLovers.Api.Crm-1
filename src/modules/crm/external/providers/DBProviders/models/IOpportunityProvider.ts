import { LogData } from '@common/shared/types/LogData';
import { Pagination, ResultPaginated } from '@common/shared/types/Pagination';

export type Opportunity = {
  id: number;
  stageId: number;
  name: string;
  email: string;
  phone: string;
  value: number;
  responsible: {
    id: number;
    name: string;
    icon: string;
  };
  createdAt: Date;
  gainedAt?: Date;
  losedAt?: Date;
};

export type FindOpportunityFilter = {
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

export default interface IOpportunityProvider {
  deleteNotificationByOpportunityId(opportunityId: number): Promise<void>;
  deleteNotificationsByOpportunityIds(opportunityIds: number[]): Promise<void>;
  deleteOpportunity(stageId: number, opportunityId: number): Promise<void>;
  deleteOpportunitiesByStageId(
    stageId: number
  ): Promise<Pick<Opportunity, 'id' | 'name'>[]>;
  findOpportunitiesByStageId(
    stageId: number,
    pagination?: Pagination,
    filters?: FindOpportunityFilter
  ): Promise<ResultPaginated<Opportunity>>;
  logOpportunityRemoval(
    stageId: number,
    opportunityId: number,
    userId: number,
    data: LogData,
    subUserId?: number
  ): Promise<void>;
}
