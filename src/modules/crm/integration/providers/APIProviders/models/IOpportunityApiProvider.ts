import {
  FindOpportunitiesWon,
  FindOpportunityFilters,
  FindOpportunityPagination
} from '@common/shared/integration/interfaces/OpportunityIntegration';

export default interface IOpportunityApiProvider {
  findOpportunitiesWonByCRMId(
    crmId: number,
    pagination: FindOpportunityPagination,
    filters?: FindOpportunityFilters
  ): Promise<FindOpportunitiesWon>;
}
