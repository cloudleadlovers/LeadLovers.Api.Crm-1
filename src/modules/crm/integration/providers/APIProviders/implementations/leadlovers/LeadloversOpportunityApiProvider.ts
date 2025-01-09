import { inject, injectable } from 'tsyringe';

import { IFindCardsWonByBoardIdRepository } from '@common/providers/LeadloversDB/models/cards/FindCardsWonByBoardIdRepository';
import {
  FindOpportunitiesWon,
  FindOpportunityFilters
} from '@common/shared/integration/interfaces/OpportunityIntegration';
import IOpportunityApiProvider from '../../models/IOpportunityApiProvider';

@injectable()
export default class LeadloversOpportunityApiProvider
  implements IOpportunityApiProvider
{
  constructor(
    @inject('FindCardsWonByBoardIdRepository')
    private FindCardsWonByBoardIdRepository: IFindCardsWonByBoardIdRepository
  ) {}

  public async findOpportunitiesWonByCRMId(
    crmId: number,
    filters?: FindOpportunityFilters
  ): Promise<FindOpportunitiesWon> {
    const opportunities = await this.FindCardsWonByBoardIdRepository.find(
      crmId,
      filters
    );
    return {
      totalOpportunities: opportunities.length,
      totalWonValue: opportunities.reduce((totalValue, opportunity) => {
        totalValue = totalValue + opportunity.value;
        return totalValue;
      }, 0),
      opportunities: opportunities.map(opportunity => {
        return {
          id: opportunity.id,
          columnId: opportunity.columnId,
          name: opportunity.name ?? '',
          email: opportunity.email ?? '',
          phone: opportunity.phone ?? '',
          value: opportunity.value ?? 0,
          responsible: {
            id: opportunity.responsibleId ?? 0,
            name: opportunity.responsibleName ?? ''
          },
          createdAt: opportunity.createdAt,
          gainedAt: opportunity.gainedAt
        };
      })
    };
  }
}
