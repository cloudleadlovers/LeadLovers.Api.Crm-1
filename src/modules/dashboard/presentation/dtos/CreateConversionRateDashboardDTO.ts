import { z } from 'zod';
import { filterDefault } from '../../shared/types/InsightFilter';

export const createConversionRateDashboardIntput = z.object({
  boardId: z.number().int(),
  days: z.number().int(),
  filters: filterDefault.optional()
});

export const createConversionRateDashboardOutput = z.object({
  averageDaysToCloseOpportunity: z.object({
    days: z.number().int()
  }),
  averageDealDurationPerStage: z.array(
    z.object({
      stageTitle: z.string(),
      averageDealDuration: z.number().int(),
      stageOrderNumber: z.number().int()
    })
  ),
  averageValueOfWonOpportunities: z.number(),
  conversionRate: z.array(
    z.object({
      stageId: z.number().int(),
      stageTitle: z.string(),
      stageType: z.string(),
      quantityOpportunities: z.number().int(),
      totalValueOpportunities: z.number().int(),
      winCount: z.number().int(),
      winAmountValue: z.number().int()
    })
  ),
  lossReasons: z.array(
    z.object({
      reason: z.string(),
      lossPercentage: z.number().int(),
      lossCount: z.number().int()
    })
  )
});
