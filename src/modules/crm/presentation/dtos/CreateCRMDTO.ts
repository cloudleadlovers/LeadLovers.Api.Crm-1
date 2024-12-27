import { z } from 'zod';

export const createCRMInput = z.object({
  logo: z.string(),
  title: z.string(),
  goal: z.number(),
  rule: z.enum(['all-crm', 'only-one-per-column', 'only-one-in-crm']),
  owners: z.array(
    z.object({
      id: z.number().int(),
      roleId: z.number().int()
    })
  ),
  stages: z.array(
    z.object({
      title: z.string(),
      color: z.string(),
      order: z.number().int()
    })
  )
});

export type CreateCRMInput = z.infer<typeof createCRMInput>;
