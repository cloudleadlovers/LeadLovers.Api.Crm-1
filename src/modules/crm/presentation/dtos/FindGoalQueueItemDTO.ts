import { z } from 'zod';

export const findGoalQueueItemOutput = z.object({
  id: z.number().int(),
  crmId: z.number().int()
});

export type FindGoalQueueItemOutput = z.infer<typeof findGoalQueueItemOutput>;
