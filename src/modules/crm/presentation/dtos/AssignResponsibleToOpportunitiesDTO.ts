import { z } from 'zod';

export const assignResponsibleToOpportunitiesInput = z.object({
  userId: z.number().int(),
  crmId: z.number().int(),
  opportunityIds: z.array(z.number().int()),
  responsibleId: z.number().int()
});

export type AssignResponsibleToOpportunitiesInput = z.infer<
  typeof assignResponsibleToOpportunitiesInput
>;
