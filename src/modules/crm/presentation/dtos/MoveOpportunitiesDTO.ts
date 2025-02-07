import { z } from 'zod';

export const moveOpportunitiesInput = z.object({
  userId: z.number().int(),
  crmId: z.number().int(),
  opportunityIds: z.array(z.number().int()),
  destinatinationStageId: z.number().int()
});

export type MoveOpportunitiesInput = z.infer<typeof moveOpportunitiesInput>;
