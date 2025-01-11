import pLimit from 'p-limit';
import { inject, injectable } from 'tsyringe';

import IOpportunityProvider from '@modules/crm/external/providers/DBProviders/models/IOpportunityProvider';
import IStageProvider from '@modules/crm/external/providers/DBProviders/models/IStageProvider';
import {
  FindCRMContentFilters,
  FindCRMContentOutput
} from '@modules/crm/presentation/dtos/FindCRMContentDTO';

@injectable()
export default class FindCRMContentService {
  constructor(
    @inject('LeadloversOpportunityProvider')
    private opportunityProvider: IOpportunityProvider,
    @inject('LeadloversStageProvider')
    private stageProvider: IStageProvider
  ) {}

  public async execute(
    crmId: number,
    filters?: FindCRMContentFilters
  ): Promise<FindCRMContentOutput> {
    const stages = await this.stageProvider.findStagesByCRMId(crmId, filters);
    const simultaneousQueries = 5;
    const limit = pLimit(simultaneousQueries);
    const stageOpportunitiesPromises = stages.map(stage =>
      limit(async () => {
        const opportunities =
          await this.opportunityProvider.findOpportunitiesByStageId(
            stage.id,
            { limit: 5 },
            filters
          );
        return {
          id: stage.id,
          crmId: stage.crmId,
          name: stage.name,
          color: stage.color,
          order: stage.order,
          amountCards: stage.amountCards,
          earnedRevenue: stage.earnedRevenue,
          createdAt: stage.createdAt,
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
      })
    );
    return { stages: await Promise.all(stageOpportunitiesPromises) };
  }
}
