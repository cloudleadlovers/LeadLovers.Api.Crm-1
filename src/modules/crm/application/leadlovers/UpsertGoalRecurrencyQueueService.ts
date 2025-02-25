import { addDays, isAfter, startOfDay } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import ICRMGoalQueueProvider from '@modules/crm/external/providers/DBProviders/models/ICRMGoalQueueProvider';
import IGoalHistoryProvider from '@modules/crm/external/providers/DBProviders/models/IGoalHistoryProvider';
import { UpsertGoalRecurrencyQueue } from '@modules/crm/presentation/dtos/UpsertGoalRecurrencyQueueDTO';

@injectable()
export default class UpsertGoalRecurrencyQueueService {
  constructor(
    @inject('LeadloversCRMGoalQueueProvider')
    private crmGoalQueueProvider: ICRMGoalQueueProvider,
    @inject('LeadloversGoalHistoryProvider')
    private crmGoalHistoryProvider: IGoalHistoryProvider
  ) {}

  public async execute(params: UpsertGoalRecurrencyQueue): Promise<void> {
    if (!params.goalRecurrency || !params.goalRecurrencyStartIn) {
      await this.crmGoalQueueProvider.deletePendingGoalsByCrmId(params.crmId);
      return;
    }

    const pendingItem = await this.crmGoalQueueProvider.findPendingGoalByCrmId(
      params.crmId
    );

    let verifyIn: Date;

    if (pendingItem != undefined) {
      const lastHistoryItem =
        await this.crmGoalHistoryProvider.findLastGoalHistoryByCrmId(
          params.crmId
        );

      if (lastHistoryItem) {
        verifyIn = addDays(
          lastHistoryItem.finishedAt,
          (params.goalRecurrency || 0) + 1
        );

        verifyIn = this.verifyPeriod(verifyIn, params.goalRecurrencyFinishIn);

        await this.crmGoalQueueProvider.updateGoalVerifyDate(
          pendingItem.id,
          verifyIn
        );

        return;
      }

      verifyIn = addDays(
        params.goalRecurrencyStartIn,
        params.goalRecurrency || 0
      );

      verifyIn = this.verifyPeriod(verifyIn, params.goalRecurrencyFinishIn);

      await this.crmGoalQueueProvider.updateGoalVerifyDate(
        pendingItem.id,
        verifyIn
      );

      return;
    }

    verifyIn = addDays(
      params.goalRecurrencyStartIn,
      params.goalRecurrency || 0
    );

    await this.crmGoalQueueProvider.createGoal({
      userId: params.userId,
      crmId: params.crmId,
      verifyIn: this.verifyPeriod(verifyIn, params.goalRecurrencyFinishIn)
    });

    return;
  }

  public verifyPeriod(verifyIn: Date, goalRecurrencyFinishIn?: Date): Date {
    if (!goalRecurrencyFinishIn) return verifyIn;

    if (isAfter(startOfDay(verifyIn), startOfDay(goalRecurrencyFinishIn))) {
      return addDays(goalRecurrencyFinishIn, 1);
    }

    return verifyIn;
  }
}
