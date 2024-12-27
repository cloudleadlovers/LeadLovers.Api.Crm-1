import { z } from 'zod';

export const createTeamReportDashboardIntput = z.object({
  boardId: z.number().int(),
  filters: z
    .object({
      createInitialDate: z.string().optional(),
      createEndDate: z.string().optional(),
      responsibles: z
        .object({
          in: z.array(z.number().int()),
          notIn: z.array(z.number().int())
        })
        .optional()
    })
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
