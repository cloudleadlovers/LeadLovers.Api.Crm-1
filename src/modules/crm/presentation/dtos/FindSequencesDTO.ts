import { z } from 'zod';

import { pagination } from '@common/shared/types/Pagination';

export const findSequencesInput = z.object({
  machineId: z.number().int(),
  pagination: pagination
});

export const findSequencesOutput = z.object({
  sequences: z.array(
    z.object({
      id: z.number().int(),
      name: z.string()
    })
  ),
  pagination: z.object({
    nextCursor: z.number().int().optional()
  })
});

export type FindSequencesOutput = z.infer<typeof findSequencesOutput>;
