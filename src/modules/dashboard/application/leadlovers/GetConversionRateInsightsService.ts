import { inject, injectable } from 'tsyringe';

import IConversionRateProvider, {
  AverageDaysToCloseOpportunity,
  AverageDealDurationPerStage,
  ConversionRate,
  ConversionRateFilters,
  LossReasons
} from '@modules/dashboard/external/providers/DBProviders/models/IConversionRateProvider';

type ConversionRateInsights = {
  averageDaysToCloseOpportunity: AverageDaysToCloseOpportunity;
  averageDealDurationPerStage: AverageDealDurationPerStage[];
  averageValueOfWonOpportunities: number;
  conversionRate: ConversionRate[];
  lossReasons: LossReasons[];
};

type Params = {
  boardId: number;
  days: number;
  filters?: ConversionRateFilters;
};

@injectable()
export default class GetConversionRateInsightsService {
  constructor(
    @inject('LeadloversConversionRateProvider')
    private conversionRateProvider: IConversionRateProvider
  ) {}

  public async execute({
    boardId,
    filters
  }: Params): Promise<ConversionRateInsights> {
    const averageDaysToCloseOpportunity =
      await this.conversionRateProvider.averageDaysToCloseOpportunity(
        boardId,
        filters
      );
    const averageDealDurationPerStage =
      await this.conversionRateProvider.averageDealDurationPerStage(
        boardId,
        filters
      );
    const averageValueOfWonOpportunities =
      await this.conversionRateProvider.averageValueOfWonOpportunities(
        boardId,
        filters
      );
    const conversionRate = await this.makeConversionRateData(boardId, filters);
    const lossReasons = await this.conversionRateProvider.getLossReasons(
      boardId,
      filters
    );
    return {
      averageDaysToCloseOpportunity,
      averageDealDurationPerStage,
      averageValueOfWonOpportunities,
      conversionRate,
      lossReasons
    };
  }

  private async makeConversionRateData(
    boardId: number,
    filters?: ConversionRateFilters
  ): Promise<ConversionRate[]> {
    const conversionRate = await this.conversionRateProvider.getConversionRate(
      boardId,
      filters
    );
    const gainConversionRate =
      await this.conversionRateProvider.getGainConversionRate(boardId, filters);
    if (
      filters?.stateCards &&
      filters.stateCards.includes('GAINED') &&
      !filters.stateCards.includes('LOSED') &&
      !filters.stateCards.includes('OPENED') &&
      gainConversionRate?.quantityOpportunities === 0
    ) {
      conversionRate.forEach(item => {
        item.winCount = 0;
        item.quantityOpportunities = 0;
      });
    }
    let winCountToNextStage = 0;
    let winAmountToNextStage = 0;
    for (let i = 0; i < conversionRate.length; i++) {
      let countOpportunities = winCountToNextStage;
      let sumAmountValue = winAmountToNextStage;

      for (let j = i; j < conversionRate.length; j++) {
        countOpportunities += conversionRate[j].quantityOpportunities;
        sumAmountValue += conversionRate[j].totalValueOpportunities;
      }

      if (conversionRate[i].winCount > 0) {
        winCountToNextStage += conversionRate[i].winCount;
        winAmountToNextStage += conversionRate[i].winAmountValue;
      }

      conversionRate[i].quantityOpportunities = countOpportunities;
      conversionRate[i].totalValueOpportunities = sumAmountValue;
    }
    conversionRate.push({
      stageId: 0,
      stageTitle: '',
      stageType: gainConversionRate?.stageType ?? 'WIN',
      quantityOpportunities: gainConversionRate?.quantityOpportunities ?? 0,
      totalValueOpportunities: gainConversionRate?.totalValueOpportunities ?? 0,
      winCount: 0,
      winAmountValue: 0
    });
    return conversionRate;
  }
}
