import { z } from 'zod';

import { MachineType } from '@common/shared/enums/MachineType';
import { pagination } from '@common/shared/types/Pagination';

export const findMessagesInput = z.object({
  machineType: z.nativeEnum(MachineType),
  sequenceId: z.number().int(),
  pagination: pagination
});

export const findMessagesOutput = z.object({
  messages: z.array(
    z.object({
      id: z.number().int(),
      name: z.string()
    })
  ),
  pagination: z.object({
    nextCursor: z.number().int().optional()
  })
});

export type FindMessagesOutput = z.infer<typeof findMessagesOutput>;
