import { inject, injectable } from 'tsyringe';

import { IAverageDaysAnOpportunitySpendsInAStageRepository } from '@common/providers/LeadloversDB/models/insights/IAverageDaysAnOpportunitySpendsInAStageRepository';
import { IAverageDaysToCloseAnOpportunityRepository } from '@common/providers/LeadloversDB/models/insights/IAverageDaysToCloseAnOpportunityRepository';
import { IAverageValueOfOpportunitiesWonRepository } from '@common/providers/LeadloversDB/models/insights/IAverageValueOfOpportunitiesWonRepository';
import { ICountLostOpportunitiesRepository } from '@common/providers/LeadloversDB/models/insights/ICountLostOpportunitiesRepository';
import { IFindConversionRateGraphDataRepository } from '@common/providers/LeadloversDB/models/insights/IFindConversionRateGraphDataRepository';
import { IFindGainConversionRateGraphDataRepository } from '@common/providers/LeadloversDB/models/insights/IFindGainConversionRateGraphDataRepository';
import IConversionRateProvider, {
  AverageDaysToCloseOpportunity,
  AverageDealDurationPerStage,
  ConversionRate,
  ConversionRateFilters,
  GainConversionRate,
  LossReasons
} from '../../models/IConversionRateProvider';

@injectable()
export default class LeadloversConversionRateProvider
  implements IConversionRateProvider
{
  constructor(
    @inject('AverageDaysAnOpportunitySpendsInAStageRepository')
    private averageDaysAnOpportunitySpendsInAStageRepository: IAverageDaysAnOpportunitySpendsInAStageRepository,
    @inject('AverageDaysToCloseAnOpportunityRepository')
    private averageDaysToCloseAnOpportunityRepository: IAverageDaysToCloseAnOpportunityRepository,
    @inject('AverageValueOfOpportunitiesWonRepository')
    private averageValueOfOpportunitiesWonRepository: IAverageValueOfOpportunitiesWonRepository,
    @inject('CountLostOpportunitiesRepository')
    private countLostOpportunitiesRepository: ICountLostOpportunitiesRepository,
    @inject('FindConversionRateGraphDataRepository')
    private findConversionRateGraphDataRepository: IFindConversionRateGraphDataRepository,
    @inject('FindGainConversionRateGraphDataRepository')
    private findGainConversionRateGraphDataRepository: IFindGainConversionRateGraphDataRepository
  ) {}

  public async averageDaysToCloseOpportunity(
    boardId: number,
    filters?: ConversionRateFilters
  ): Promise<AverageDaysToCloseOpportunity> {
    const result = await this.averageDaysToCloseAnOpportunityRepository.average(
      boardId,
      filters
    );
    return { days: result };
  }

  public async averageDealDurationPerStage(
    boardId: number,
    filters?: ConversionRateFilters
  ): Promise<AverageDealDurationPerStage[]> {
    const result =
      await this.averageDaysAnOpportunitySpendsInAStageRepository.average(
        boardId,
        filters
      );
    return result.map(item => {
      return {
        stageTitle: item.columnTitle,
        averageDealDuration: item.averageDealDuration,
        stageOrderNumber: Number(item.columnOrderNumber)
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
        stageId: item.columnId,
        stageTitle: item.columnTitle,
        stageType: item.columnType,
        quantityOpportunities: item.quantityCards,
        totalValueOpportunities: item.totalValueCards,
        winCount: item.winCountCardsInStage ?? 0,
        winAmountValue: item.winAmountCardsInStage ?? 0
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
      stageType: result.columnType,
      quantityOpportunities:
        filters?.stateCards && !filters.stateCards.includes('GAINED')
          ? 0
          : result.quantityCards,
      totalValueOpportunities: result.totalValueCards
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
