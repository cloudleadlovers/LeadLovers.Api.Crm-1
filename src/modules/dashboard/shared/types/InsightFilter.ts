import { z } from 'zod';

export const opportunityStatus = z.enum(['OPENED', 'LOSED', 'GAINED']);

export const filterDefault = z.object({
  stateCards: z.array(opportunityStatus).optional(),
  createInitialDate: z.string().optional(),
  createEndDate: z.string().optional(),
  closedInitialDate: z.string().optional(),
  closedEndDate: z.string().optional(),
  responsibles: z
    .object({
      in: z.array(z.number().int()),
      notIn: z.array(z.number().int()),
      isNull: z.boolean().optional()
    })
    .optional()
});

export type InsightFiltersJSON = z.infer<typeof filterDefault>;
export type OpportunityStatus = z.infer<typeof opportunityStatus>;
