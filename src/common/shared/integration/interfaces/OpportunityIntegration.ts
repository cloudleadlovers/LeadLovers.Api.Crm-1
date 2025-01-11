import { Pagination } from '@common/shared/types/Pagination';

type Opportunity = {
  id: number;
  columnId: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  value: number;
  responsible?: {
    id: number | null;
    name: string | null;
  };
  createdAt: Date;
  gainedAt?: Date | null;
  losedAt?: Date | null;
};

export type FindOpportunityFilters = {
  stateCards?: ('OPENED' | 'LOSED' | 'GAINED')[];
  createInitialDate?: string;
  createEndDate?: string;
  closedInitialDate?: string;
  closedEndDate?: string;
  responsibles?: {
    in?: number[];
    notIn?: number[];
    isNull?: boolean;
  };
};

export type FindOpportunitiesWon = {
  totalWonValue: number;
  totalOpportunities: number;
  opportunities: Opportunity[];
  nextCursor?: number;
};

export interface OpportunityApi {
  findOpportunitiesWonByCRMId(
    crmId: number,
    pagination: Pagination,
    filters?: FindOpportunityFilters
  ): Promise<FindOpportunitiesWon>;
}
