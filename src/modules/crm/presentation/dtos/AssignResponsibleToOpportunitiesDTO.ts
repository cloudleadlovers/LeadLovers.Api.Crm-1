import { z } from 'zod';

export const assignResponsibleToOpportunitiesInput = z.object({
  userId: z.number().int(),
  crmId: z.number().int(),
  opportunities: z.array(
    z.object({
      id: z.number().int(),
      stageId: z.number().int()
    })
  ),
  responsibleId: z.number().int()
});

export type AssignResponsibleToOpportunitiesInput = z.infer<
  typeof assignResponsibleToOpportunitiesInput
>;
