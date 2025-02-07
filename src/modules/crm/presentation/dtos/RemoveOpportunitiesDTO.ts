import { z } from 'zod';

export const removeOpportunitiesInput = z.object({
  userId: z.number().int(),
  crmId: z.number().int(),
  opportunityIds: z.array(z.number().int())
});

export type RemoveOpportunitiesInput = z.infer<typeof removeOpportunitiesInput>;
