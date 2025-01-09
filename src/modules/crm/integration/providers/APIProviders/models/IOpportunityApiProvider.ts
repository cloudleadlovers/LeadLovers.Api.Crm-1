import {
  FindOpportunitiesWon,
  FindOpportunityFilters
} from '@common/shared/integration/interfaces/OpportunityIntegration';

export default interface IOpportunityApiProvider {
  findOpportunitiesWonByCRMId(
    crmId: number,
    filters?: FindOpportunityFilters
  ): Promise<FindOpportunitiesWon>;
}
