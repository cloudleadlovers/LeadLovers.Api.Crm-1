import { z } from 'zod';

export const removeOpportunitiesInput = z.object({
  userId: z.number().int(),
  crmId: z.number().int(),
  opportunities: z.array(
    z.object({
      id: z.number().int(),
      stageId: z.number().int()
    })
  )
});

export type RemoveOpportunitiesInput = z.infer<typeof removeOpportunitiesInput>;
