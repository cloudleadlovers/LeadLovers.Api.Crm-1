import { opportunityLayout } from '@common/shared/types/OpportunityLayout';
import { z } from 'zod';

export const findOpportunityDisplayLayoutInput = z.object({
  crmId: z.number().int()
});

export const findOpportunityDisplayLayoutOutput = z.object({
  id: z.number().int(),
  crmId: z.number().int(),
  layout: opportunityLayout,
  createdAt: z.date()
});

export type FindOpportunityDisplayLayoutOutput = z.infer<
  typeof findOpportunityDisplayLayoutOutput
>;
