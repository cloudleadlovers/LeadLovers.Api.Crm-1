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
  gainedAt?: Date;
  losedAt?: Date;
};

export type FindOpportunityPagination = {
  limit: number;
  lastId?: number;
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
    pagination: FindOpportunityPagination,
    filters?: FindOpportunityFilters
  ): Promise<FindOpportunitiesWon>;
}
