import { StageStatus } from '@common/shared/enums/StageStatus';
import { z } from 'zod';

export const updateStageInput = z.object({
  userId: z.number().int(),
  userEmail: z.string().email(),
  stageId: z.number().int(),
  crmId: z.number().int(),
  name: z.string().optional(),
  color: z.string().optional(),
  order: z.number().int().optional(),
  status: z.nativeEnum(StageStatus).optional(),
  estimatedRevenue: z.number().int().optional()
});

export type UpdateStageInput = z.infer<typeof updateStageInput>;
