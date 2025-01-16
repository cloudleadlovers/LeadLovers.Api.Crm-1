import { z } from 'zod';

export const createStageInput = z.object({
  userId: z.number().int(),
  userEmail: z.string().email(),
  crmId: z.number().int(),
  name: z.string(),
  color: z.string(),
  order: z.number().int()
});

export const createStageOutput = z.object({
  id: z.number().int()
});

export type CreateStageInput = z.infer<typeof createStageInput>;
export type CreateStageOutput = z.infer<typeof createStageOutput>;
