import { CRMRule } from '@common/shared/enums/CRMRules';
import { z } from 'zod';

export const createCRMInput = z
  .object({
    userId: z.number().int(),
    userEmail: z.string().email(),
    logo: z.string(),
    name: z.string(),
    description: z.string(),
    goal: z.number(),
    goalRecurrency: z.number().int().optional(),
    goalRecurrencyStartIn: z.string().optional(),
    goalRecurrencyFinishIn: z.string().optional(),
    rule: z.nativeEnum(CRMRule),
    owners: z.array(
      z.object({
        id: z.number().int(),
        roleId: z.number().int()
      })
    ),
    stages: z.array(
      z.object({
        name: z.string(),
        color: z.string(),
        order: z.number().int()
      })
    )
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

export const createCRMOutput = z.object({
  id: z.number().int()
});

export type CreateCRMInput = z.infer<typeof createCRMInput>;
export type CreateCRMOutput = z.infer<typeof createCRMOutput>;
