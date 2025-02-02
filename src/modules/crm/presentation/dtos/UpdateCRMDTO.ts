import { z } from 'zod';

export const updateCRMInput = z.object({
  crmId: z.number().int(),
  name: z.string().optional(),
  goal: z.number().int().optional(),
  logo: z.string().optional()
});

export type UpdateCRMInput = z.infer<typeof updateCRMInput>;
