import { CRMRule } from '@common/shared/enums/CRMRules';
import { z } from 'zod';

export const createCRMInput = z.object({
  userId: z.number().int(),
  userEmail: z.string().email(),
  logo: z.string(),
  name: z.string(),
  goal: z.number(),
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
});

export const createCRMOutput = z.object({
  id: z.number().int()
});

export type CreateCRMInput = z.infer<typeof createCRMInput>;
export type CreateCRMOutput = z.infer<typeof createCRMOutput>;
