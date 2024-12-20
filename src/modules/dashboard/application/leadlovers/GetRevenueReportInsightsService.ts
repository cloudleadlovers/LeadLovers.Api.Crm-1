import { inject, injectable } from 'tsyringe';

import IRevenueReportProvider, {
  CurrentCRMValue,
  EarnedRevenue,
  RevenueReportFilters
} from '@modules/dashboard/external/providers/DBProviders/models/IRevenueReportProvider';

type RevenueReportInsight = {
  earnedRevenue: {
    totalRevenue: number;
    items: EarnedRevenue[];
  };
  currentCRMValue: {
    currentValue: number;
    estimatedGoal: number;
    items: CurrentCRMValue[];
  };
};

type Params = {
  boardId: number;
  initialDate: string;
  endDate: string;
  filters?: RevenueReportFilters;
};

@injectable()
export default class GetRevenueReportInsightsService {
  constructor(
    @inject('LeadloversRevenueReportProvider')
    private revenueReportProvider: IRevenueReportProvider
  ) {}

  public async execute({
    boardId,
    initialDate,
    endDate,
    filters
  }: Params): Promise<RevenueReportInsight> {
    const { earnedRevenue } = await this.makeEarnedRevenueData(
      boardId,
      new Date(initialDate),
      new Date(endDate),
      filters
    );
    const { currentCRMValue } = await this.makeCurrentCRMValueData(
      boardId,
      filters
    );
    return { earnedRevenue, currentCRMValue };
  }

  private async makeEarnedRevenueData(
    boardId: number,
    initialDate: Date,
    endDate: Date,
    filters?: RevenueReportFilters
  ): Promise<Pick<RevenueReportInsight, 'earnedRevenue'>> {
    const items = await this.revenueReportProvider.getEarnedRevenue(
      boardId,
      initialDate,
      endDate,
      filters
    );
    return {
      earnedRevenue: {
        totalRevenue: items.reduce(
          (sum, item) => sum + item.opportunitiesValue,
          0
        ),
        items
      }
    };
  }

  private async makeCurrentCRMValueData(
    boardId: number,
    filters?: RevenueReportFilters
  ): Promise<Pick<RevenueReportInsight, 'currentCRMValue'>> {
    const items = await this.revenueReportProvider.getCurrentCRMValue(
      boardId,
      filters
    );
    return {
      currentCRMValue: {
        currentValue: items.reduce(
          (sum, item) => sum + item.opportunitiesValue,
          0
        ),
        estimatedGoal: items.reduce((sum, item) => sum + item.estimatedGoal, 0),
        items: items
      }
    };
  }
}
