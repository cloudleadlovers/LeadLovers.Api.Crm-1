import { StageStatus } from '@common/shared/enums/StageStatus';
import { z } from 'zod';

export const removeStageInput = z.object({
  userId: z.number().int(),
  userEmail: z.string().email(),
  id: z.number().int(),
  crmId: z.number().int(),
  status: z.nativeEnum(StageStatus)
});

export type RemoveStageInput = z.infer<typeof removeStageInput>;
