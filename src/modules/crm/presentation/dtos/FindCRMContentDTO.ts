import { z } from 'zod';

export const opportunityStatus = z.enum(['OPENED', 'LOSED', 'GAINED']);

export const findCRMContentFilters = z.object({
  stage: z
    .object({
      in: z.array(z.number().int()).optional(),
      notIn: z.array(z.number().int()).optional()
    })
    .optional(),
  name: z.string().optional(),
  createInitialDate: z.string().optional(),
  createEndDate: z.string().optional(),
  closedInitialDate: z.string().optional(),
  closedEndDate: z.string().optional(),
  responsibles: z
    .object({
      in: z.array(z.number().int()).optional(),
      notIn: z.array(z.number().int()).optional(),
      isNull: z.boolean().optional()
    })
    .optional(),
  stateCards: z.array(opportunityStatus).optional(),
  value: z
    .object({
      greaterThan: z.number().int().optional(),
      lessThan: z.number().int().optional(),
      equalTo: z.number().int().optional()
    })
    .optional()
});

export const findCRMContentInput = z.object({
  crmId: z.number().int(),
  filters: findCRMContentFilters
});

export const findCRMContentOutput = z.object({
  stages: z.array(
    z.object({
      id: z.number().int(),
      crmId: z.number().int(),
      name: z.string(),
      color: z.string(),
      order: z.number().int(),
      amountCards: z.number().int(),
      earnedRevenue: z.number().int(),
      createdAt: z.date(),
      opportunities: z.array(
        z.object({
          id: z.number().int(),
          stageId: z.number().int(),
          name: z.string(),
          email: z.string(),
          phone: z.string(),
          value: z.number().int(),
          responsible: z.object({
            id: z.number().int(),
            name: z.string(),
            icon: z.string()
          }),
          createdAt: z.date(),
          gainedAt: z.date().optional(),
          losedAt: z.date().optional()
        })
      ),
      pagination: z.object({
        nextCursor: z.number().int().optional()
      })
    })
  )
});

export type FindCRMContentFilters = z.infer<typeof findCRMContentFilters>;
export type FindCRMContentOutput = z.infer<typeof findCRMContentOutput>;
