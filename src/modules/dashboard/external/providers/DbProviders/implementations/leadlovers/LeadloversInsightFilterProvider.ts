import { inject, injectable } from 'tsyringe';

import { IFindReportFiltersByUsuaSistCodiRepository } from '@common/providers/LeadloversDB/models/insights/IFindReportFiltersByUsuaSistCodiRepository';
import { IInsertReportFilterRepository } from '@common/providers/LeadloversDB/models/insights/IInsertReportFilterRepository';
import { IRemoveReportFilterRepository } from '@common/providers/LeadloversDB/models/insights/IRemoveReportFilterRepository';
import { IUpdateReportFilterRepository } from '@common/providers/LeadloversDB/models/insights/IUpdateReportFilterRepository';
import IInsightFilterProvider, {
  CreateFilterParams,
  EditFilterParams,
  InsightFilter
} from '../../models/IInsightFilterProvider';

@injectable()
export class LeadloversInsightFilterProvider implements IInsightFilterProvider {
  constructor(
    @inject('FindReportFiltersByUsuaSistCodiRepository')
    private findReportFiltersByUsuaSistCodiRepository: IFindReportFiltersByUsuaSistCodiRepository,
    @inject('InsertReportFilterRepository')
    private insertReportFilterRepository: IInsertReportFilterRepository,
    @inject('RemoveReportFilterRepository')
    private removeReportFilterRepository: IRemoveReportFilterRepository,
    @inject('UpdateReportFilterRepository')
    private updateReportFilterRepository: IUpdateReportFilterRepository
  ) {}

  public async createFilter(params: CreateFilterParams): Promise<number> {
    return await this.insertReportFilterRepository.insert(
      params.userId,
      params.name,
      params.filters
    );
  }

  public async deleteFilter(filterId: number): Promise<void> {
    await this.removeReportFilterRepository.remove(filterId);
  }

  public async editFilter(params: EditFilterParams): Promise<void> {
    await this.updateReportFilterRepository.update(
      params.id,
      params.name,
      params.filters
    );
  }

  public async findAllFiltersByUserId(
    userId: number
  ): Promise<InsightFilter[]> {
    const filters =
      await this.findReportFiltersByUsuaSistCodiRepository.find(userId);
    return filters.map(filter => {
      return {
        id: filter.id,
        name: filter.name,
        filters: JSON.parse(filter.filters),
        userId: filter.userId,
        createdAt: filter.createdAt
      };
    });
  }
}
