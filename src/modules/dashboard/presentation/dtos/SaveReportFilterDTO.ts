import { z } from 'zod';

export const saveReportFilterIntput = z.object({
  userId: z.number().int(),
  name: z.string(),
  filters: z.object({
    stateCards: z.array(z.enum(['OPENED', 'LOSED', 'GAINED'])).optional(),
    createInitialDate: z.string().optional(),
    createEndDate: z.string().optional(),
    closedInitialDate: z.string().optional(),
    closedEndDate: z.string().optional(),
    responsibles: z
      .object({
        in: z.array(z.number().int()),
        notIn: z.array(z.number().int())
      })
      .optional()
  })
});

export const saveReportFilterOutput = z.object({
  id: z.number().int()
});
