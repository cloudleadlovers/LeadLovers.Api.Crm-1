import { z } from 'zod';

export const cardLayout = z.object({
  leadCodi: z.boolean(),
  leadEmail: z.boolean(),
  leadName: z.boolean(),
  leadPhone: z.boolean(),
  leadCommercialPhone: z.boolean(),
  leadScore: z.boolean(),
  leadTags: z.boolean(),
  value: z.boolean(),
  dealStatus: z.boolean(),
  dealScheduleDate: z.boolean()
});

export type CardLayout = z.infer<typeof cardLayout>;
