import { z } from 'zod';

export const editReportFilterIntput = z.object({
  id: z.number().int(),
  name: z.string().optional(),
  filters: z
    .object({
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
    .optional()
});
