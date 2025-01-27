import { inject, injectable } from 'tsyringe';

import {
  FindOpportunitiesWon,
  FindOpportunityFilters
} from '@common/shared/integration/interfaces/OpportunityIntegration';
import { Pagination } from '@common/shared/types/Pagination';
import IOpportunityApiProvider from '@modules/crm/integration/providers/APIProviders/models/IOpportunityApiProvider';

@injectable()
export default class FindOpportunitiesWonByCRMIdService {
  constructor(
    @inject('LeadloversOpportunityApiProvider')
    private opportunityApiProvider: IOpportunityApiProvider
  ) {}

  public async execute(
    crmId: number,
    pagination: Pagination,
    filters?: FindOpportunityFilters
  ): Promise<FindOpportunitiesWon> {
    return await this.opportunityApiProvider.findOpportunitiesWonByCRMId(
      crmId,
      pagination,
      filters
    );
  }
}
