import { inject, injectable } from 'tsyringe';

import { IFindCardsByColumnIdRepository } from '@common/providers/LeadloversDB/models/cards/IFindCardsByColumnIdRepository';
import { Pagination, ResultPaginated } from '@common/shared/types/Pagination';
import IOpportunityProvider, {
  FindOpportunityFilter,
  Opportunity
} from '../../models/IOpportunityProvider';

@injectable()
export default class LeadloversOpportunityProvider
  implements IOpportunityProvider
{
  constructor(
    @inject('FindCardsByColumnIdRepository')
    private findCardsByColumnIdRepository: IFindCardsByColumnIdRepository
  ) {}

  public async findOpportunitiesByStageId(
    stageId: number,
    pagination: Pagination,
    filters?: FindOpportunityFilter
  ): Promise<ResultPaginated<Opportunity>> {
    const cards = await this.findCardsByColumnIdRepository.find(
      stageId,
      pagination,
      filters
    );
    return {
      nextCursor: cards.nextCursor,
      items: cards.items.map(item => {
        return {
          id: item.id,
          stageId: item.columnId,
          name: item.name ?? '',
          email: item.email ?? '',
          phone: item.phone ?? '',
          value: item.value,
          responsible: {
            id: item.responsibleId ?? 0,
            name: item.responsibleName ?? '',
            icon: item.responsibleIcon ?? ''
          },
          createdAt: item.createdAt,
          gainedAt: item.gainedAt ?? undefined,
          losedAt: item.losedAt ?? undefined
        };
      })
    };
  }
}
