import { z } from 'zod';
import { filterDefault } from '../../shared/types/InsightFilter';

export const createTeamReportDashboardIntput = z.object({
  boardId: z.number().int(),
  filters: filterDefault
    .pick({ createInitialDate: true, createEndDate: true, responsibles: true })
    .optional()
});

export const createTeamReportDashboardOutput = z.object({
  teamReport: z.array(
    z.object({
      responsibleName: z.string(),
      valueOportunities: z.number().int(),
      countWinOpportunities: z.number().int(),
      winAmount: z.number().int(),
      averageTimeToWinDays: z.number().int(),
      winRate: z.number().int()
    })
  )
});
