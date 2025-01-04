import { z } from 'zod';

export const deleteInsightFilterIntput = z.object({
  id: z.number().int()
});
