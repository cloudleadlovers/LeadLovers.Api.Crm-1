import { z } from 'zod';
import { filterDefault } from '../../shared/types/InsightFilter';

export const createRevenueReportDashboardIntput = z.object({
  boardId: z.number().int(),
  initialDate: z.string().datetime(),
  endDate: z.string().datetime(),
  filters: filterDefault.pick({ responsibles: true }).optional()
});

export const createRevenueReportDashboardOutput = z.object({
  earnedRevenue: z.object({
    totalRevenue: z.number().int(),
    items: z.array(
      z.object({
        creationDate: z.date(),
        opportunitiesValue: z.number().int(),
        opportunitiesNumber: z.number().int()
      })
    )
  }),
  currentCRMValue: z.object({
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
});
