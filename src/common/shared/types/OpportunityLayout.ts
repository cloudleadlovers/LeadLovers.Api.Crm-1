import { z } from 'zod';

export const opportunityLayout = z.object({
  contactId: z.boolean(),
  email: z.boolean(),
  name: z.boolean(),
  phone: z.boolean(),
  commercialPhone: z.boolean(),
  score: z.boolean(),
  tags: z.boolean(),
  value: z.boolean(),
  dealStatus: z.boolean(),
  dealScheduleDate: z.boolean()
});

export type OpportunityLayout = z.infer<typeof opportunityLayout>;
