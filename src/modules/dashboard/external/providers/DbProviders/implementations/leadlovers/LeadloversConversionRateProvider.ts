import { inject } from 'tsyringe';

import { IAverageDaysAnOpportunitySpendsInAStageRepository } from '@common/providers/LeadloversProvider/models/IAverageDaysAnOpportunitySpendsInAStageRepository';
import { IAverageValueOfOpportunitiesWonRepository } from '@common/providers/LeadloversProvider/models/IAverageValueOfOpportunitiesWonRepository';
import { ICountLostOpportunitiesRepository } from '@common/providers/LeadloversProvider/models/ICountLostOpportunitiesRepository';
import { IFindConversionRateGraphDataRepository } from '@common/providers/LeadloversProvider/models/IFindConversionRateGraphDataRepository';
import { IFindGainConversionRateGraphDataRepository } from '@common/providers/LeadloversProvider/models/IFindGainConversionRateGraphDataRepository';
import IConversionRateProvider, {
  AverageDealDuration,
  ConversionRate,
  ConversionRateFilters,
  GainConversionRate,
  LossReasons
} from '../../models/IConversionRateProvider';

export default class LeadloversConversionRateProvider
  implements IConversionRateProvider
{
  constructor(
    @inject('AverageDaysAnOpportunitySpendsInAStageRepository')
    private averageDaysAnOpportunitySpendsInAStageRepository: IAverageDaysAnOpportunitySpendsInAStageRepository,
    @inject('AverageValueOfOpportunitiesWonRepository')
    private averageValueOfOpportunitiesWonRepository: IAverageValueOfOpportunitiesWonRepository,
    @inject('CountLostOpportunitiesRepository')
    private countLostOpportunitiesRepository: ICountLostOpportunitiesRepository,
    @inject('FindConversionRateGraphDataRepository')
    private findConversionRateGraphDataRepository: IFindConversionRateGraphDataRepository,
    @inject('FindGainConversionRateGraphDataRepository')
    private findGainConversionRateGraphDataRepository: IFindGainConversionRateGraphDataRepository
  ) {}

  public async averageDealDuration(
    boardId: number,
    days: number,
    filters?: ConversionRateFilters
  ): Promise<AverageDealDuration[]> {
    const result =
      await this.averageDaysAnOpportunitySpendsInAStageRepository.average(
        boardId,
        days,
        filters
      );
    return result.map(item => {
      return {
        stageTitle: item.stageTitle,
        averageDealDuration: item.averageDealDuration,
        stageOrderNumber: item.stageOrderNumber
      };
    });
  }

  public async averageValueOfWonOpportunities(
    boardId: number,
    filters?: ConversionRateFilters
  ): Promise<number> {
    return await this.averageValueOfOpportunitiesWonRepository.average(
      boardId,
      filters
    );
  }

  public async getConversionRate(
    boardId: number,
    filters?: ConversionRateFilters
  ): Promise<ConversionRate[]> {
    const result = await this.findConversionRateGraphDataRepository.find(
      boardId,
      filters
    );
    return result.map(item => {
      return {
        stageId: item.stageId,
        stageTitle: item.stageTitle,
        stageType: item.stageType,
        quantityOpportunities: item.quantityOpportunities,
        totalValueOpportunities: item.totalValueOpportunities,
        winCount: item.winCountOpportunitiesInStage ?? 0,
        winAmountValue: item.winAmountOpportunitiesInStage ?? 0
      };
    });
  }

  public async getGainConversionRate(
    boardId: number,
    filters?: ConversionRateFilters
  ): Promise<GainConversionRate | undefined> {
    const result = await this.findGainConversionRateGraphDataRepository.find(
      boardId,
      filters
    );
    if (!result) return result;
    return {
      stageType: result.stageType,
      quantityOpportunities:
        filters?.stateCards && !filters.stateCards.includes('GAINED')
          ? 0
          : result.quantityOpportunities,
      totalValueOpportunities: result.totalValueOpportunities
    };
  }

  public async getLossReasons(
    boardId: number,
    filters?: ConversionRateFilters
  ): Promise<LossReasons[]> {
    const result = await this.countLostOpportunitiesRepository.count(
      boardId,
      filters
    );
    const total = result.reduce((sum, item) => sum + item.count, 0);
    return result.map(item => {
      return {
        reason: item.reason,
        lossPercentage: (item.count / total) * 100,
        lossCount: item.count
      };
    });
  }
}
