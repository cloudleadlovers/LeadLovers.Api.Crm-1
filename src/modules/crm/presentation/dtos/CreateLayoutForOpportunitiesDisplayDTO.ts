import { z } from 'zod';

import { opportunityLayout } from '@common/shared/types/OpportunityLayout';

export const createLayoutForOpportunitiesDisplayInput = z.object({
  crmId: z.number().int(),
  layout: opportunityLayout
});

export type CreateLayoutForOpportunitiesDisplayInput = z.infer<
  typeof createLayoutForOpportunitiesDisplayInput
>;
