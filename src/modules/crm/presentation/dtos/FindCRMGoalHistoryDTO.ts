import { z } from 'zod';

export const findCRMGoalHistoryOutput = z.array(
  z.object({
    id: z.number().int(),
    goal: z.number().int(),
    achieved: z.number().int(),
    startedAt: z.date(),
    finishedAt: z.date()
  })
);

export const findCRMGoalHistoryInput = z.object({
  crmId: z.number().int()
});

export type FindCRMGoalHistoryOutput = z.infer<typeof findCRMGoalHistoryOutput>;
