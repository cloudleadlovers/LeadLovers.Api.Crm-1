import { inject, injectable } from 'tsyringe';

import { Pagination } from '@common/shared/types/Pagination';
import IOpportunityProvider from '@modules/crm/external/providers/DBProviders/models/IOpportunityProvider';
import {
  FindStageContentFilters,
  FindStageContentOutput
} from '@modules/crm/presentation/dtos/FindStageContentDTO';

@injectable()
export default class FindStageContentService {
  constructor(
    @inject('LeadloversOpportunityProvider')
    private opportunityProvider: IOpportunityProvider
  ) {}

  public async execute(
    stageId: number,
    pagination: Pagination,
    filters?: FindStageContentFilters
  ): Promise<FindStageContentOutput> {
    const opportunities =
      await this.opportunityProvider.findOpportunitiesByStageId(
        stageId,
        pagination,
        filters
      );
    return {
      opportunities: opportunities.items.map(opportunity => {
        return {
          id: opportunity.id,
          stageId: opportunity.stageId,
          name: opportunity.name,
          email: opportunity.email,
          phone: opportunity.phone,
          value: opportunity.value,
          responsible: opportunity.responsible,
          createdAt: opportunity.createdAt,
          gainedAt: opportunity.gainedAt,
          losedAt: opportunity.losedAt
        };
      }),
      pagination: {
        nextCursor: opportunities.nextCursor
      }
    };
  }
}
