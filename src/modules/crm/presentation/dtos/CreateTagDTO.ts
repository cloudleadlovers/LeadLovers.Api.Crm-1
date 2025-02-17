import { z } from 'zod';

export const createTagInput = z.object({
  userId: z.number().int(),
  tagName: z.string()
});

export const createTagOutput = z.object({
  id: z.number().int()
});

export type CreateTagOutput = z.infer<typeof createTagOutput>;
