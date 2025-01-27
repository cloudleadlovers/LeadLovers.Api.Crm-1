import { z } from 'zod';

export const findStageTemplatesOutput = z.array(
  z.object({
    id: z.number().int(),
    title: z.string(),
    stages: z.array(
      z.object({
        id: z.number().int(),
        title: z.string(),
        color: z.string(),
        order: z.number().int()
      })
    )
  })
);
