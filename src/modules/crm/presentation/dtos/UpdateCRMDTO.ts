import { z } from 'zod';

export const updateCRMInput = z
  .object({
    crmId: z.number().int(),
    name: z.string().optional(),
    goal: z.number().int().optional(),
    goalRecurrency: z.number().int().optional(),
    goalRecurrencyStartIn: z.string().optional(),
    goalRecurrencyFinishIn: z.string().optional(),
    logo: z.string().optional()
  })
  .transform(data => ({
    ...data,
    goalRecurrencyStartIn: data.goalRecurrencyStartIn
      ? new Date(data.goalRecurrencyStartIn)
      : undefined,
    goalRecurrencyFinishIn: data.goalRecurrencyFinishIn
      ? new Date(data.goalRecurrencyFinishIn)
      : undefined
  }))
  .refine(
    data => {
      if (
        (data.goalRecurrency ?? 0) !== 0 &&
        data.goalRecurrencyStartIn === undefined
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'goalRecurrencyStartIn must have a value.',
      path: ['goalRecurrencyStartIn']
    }
  )
  .refine(
    data => {
      if (data.goalRecurrencyStartIn && data.goalRecurrencyFinishIn) {
        return data.goalRecurrencyStartIn < data.goalRecurrencyFinishIn;
      }
      return true;
    },
    {
      message:
        'goalRecurrencyStartIn must be earlier than goalRecurrencyFinishIn.',
      path: ['goalRecurrencyStartIn']
    }
  );

export type UpdateCRMInput = z.infer<typeof updateCRMInput>;
