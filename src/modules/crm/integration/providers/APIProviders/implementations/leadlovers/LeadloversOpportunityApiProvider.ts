import { inject, injectable } from 'tsyringe';

import { IFindCardsWonByBoardIdRepository } from '@common/providers/LeadloversDB/models/cards/IFindCardsWonByBoardIdRepository';
import {
  FindOpportunitiesWon,
  FindOpportunityFilters
} from '@common/shared/integration/interfaces/OpportunityIntegration';
import { Pagination } from '@common/shared/types/Pagination';
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
    pagination: Pagination,
    filters?: FindOpportunityFilters
  ): Promise<FindOpportunitiesWon> {
    const result = await this.FindCardsWonByBoardIdRepository.find(
      crmId,
      pagination,
      filters
    );
    return {
      totalOpportunities: result.items.length,
      totalWonValue: result.items.reduce((totalValue, opportunity) => {
        totalValue = totalValue + opportunity.value;
        return totalValue;
      }, 0),
      opportunities: result.items.map(opportunity => {
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
      }),
      nextCursor: result.nextCursor
    };
  }
}
