import {
  FindOpportunitiesWon,
  FindOpportunityFilters
} from '@common/shared/integration/interfaces/OpportunityIntegration';
import { Pagination } from '@common/shared/types/Pagination';

export default interface IOpportunityApiProvider {
  findOpportunitiesWonByCRMId(
    crmId: number,
    pagination: Pagination,
    filters?: FindOpportunityFilters
  ): Promise<FindOpportunitiesWon>;
}
