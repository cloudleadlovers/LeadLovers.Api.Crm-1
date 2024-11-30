import { z } from 'zod';

export const createConversionRateDashboardIntput = z.object({
  boardId: z.number().int(),
  days: z.number().int(),
  filters: z
    .object({
      stateCards: z.array(z.enum(['OPENED', 'LOSED', 'GAINED'])).optional(),
      createInitialDate: z.string().optional(),
      createEndDate: z.string().optional(),
      closedInitialDate: z.string().optional(),
      closedEndDate: z.string().optional(),
      responsibleId: z.number().int().optional()
    })
    .optional()
});

export const createConversionRateDashboardOutput = z.object({
  averageDealDuration: z.array(
    z.object({
      stageTitle: z.string(),
      averageDealDuration: z.number().int(),
      stageOrderNumber: z.number().int()
    })
  ),
  averageValueOfWonOpportunities: z.number().int(),
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
