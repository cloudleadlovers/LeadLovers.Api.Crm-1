import z from 'zod';

export const upsertGoalRecurrencyQueue = z.object({
  userId: z.number().int(),
  crmId: z.number().int(),
  goalRecurrency: z.number().int().optional(),
  goalRecurrencyStartIn: z.date().optional(),
  goalRecurrencyFinishIn: z.date().optional()
});

export type UpsertGoalRecurrencyQueue = z.infer<
  typeof upsertGoalRecurrencyQueue
>;
