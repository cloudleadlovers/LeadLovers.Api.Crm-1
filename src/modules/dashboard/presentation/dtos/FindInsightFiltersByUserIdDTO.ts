import { z } from 'zod';

export const findInsightFiltersByUserIdOutput = z.object({
  filters: z.array(
    z.object({
      id: z.number().int(),
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
      }),
      createdAt: z.date()
    })
  )
});
