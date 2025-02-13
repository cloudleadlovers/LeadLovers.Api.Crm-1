import { z } from 'zod';

export const findTagsOutput = z.array(
  z.object({
    id: z.number().int(),
    name: z.string()
  })
);

export type FindTagsOutput = z.infer<typeof findTagsOutput>;
