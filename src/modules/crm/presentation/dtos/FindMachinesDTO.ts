import { z } from 'zod';

import { pagination } from '@common/shared/types/Pagination';

export const findMachinesInput = z.object({
  userId: z.number().int(),
  pagination: pagination
});

export const findMachinesOutput = z.object({
  machines: z.array(
    z.object({
      id: z.number().int(),
      name: z.string()
    })
  ),
  pagination: z.object({
    nextCursor: z.number().int().optional()
  })
});

export type FindMachinesOutput = z.infer<typeof findMachinesOutput>;
