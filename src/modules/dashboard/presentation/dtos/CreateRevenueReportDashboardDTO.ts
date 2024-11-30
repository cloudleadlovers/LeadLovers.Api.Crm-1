import { z } from 'zod';

export const createRevenueReportDashboardIntput = z.object({
  boardId: z.number().int(),
  initialDate: z.string().datetime(),
  endDate: z.string().datetime(),
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

export const createRevenueReportDashboardOutput = z.object({
  earnedRevenue: z.array(
    z.object({
      totalRevenue: z.number().int(),
      items: z.array(
        z.object({
          creationDate: z.string().datetime(),
          opportunitiesValue: z.number().int(),
          opportunitiesNumber: z.number().int()
        })
      )
    })
  ),
  currentCRMValue: z.array(
    z.object({
      currentValue: z.number().int(),
      estimatedGoal: z.number().int(),
      items: z.array(
        z.object({
          columName: z.string(),
          estimatedGoal: z.number().int(),
          opportunitiesValue: z.number().int(),
          orderNumber: z.number().int()
        })
      )
    })
  )
});
