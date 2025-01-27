import { DealStatus } from '@common/shared/enums/DealStatus';
import { z } from 'zod';

export const createOpportunityInput = z.object({
  userId: z.number().int(),
  crmId: z.number().int(),
  stageId: z.number().int(),
  contactId: z.number().int(),
  name: z.string(),
  email: z.string().optional(),
  phone: z.string().optional(),
  commercialPhone: z.string().optional(),
  score: z.number().int().default(0),
  tags: z.string().optional(),
  value: z.number().int().default(0),
  responsible: z.object({
    id: z.number().int(),
    name: z.string(),
    icon: z.string()
  }),
  deal: z.object({
    state: z.nativeEnum(DealStatus),
    scheduleDate: z.date().optional()
  })
});

export const createOpportunityOutput = z.object({
  id: z.number().int()
});

export type CreateOpportunityInput = z.infer<typeof createOpportunityInput>;
export type CreateOpportunityOutput = z.infer<typeof createOpportunityOutput>;
