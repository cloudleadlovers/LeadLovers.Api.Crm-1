import { z } from 'zod';

import { pagination } from '@common/shared/types/Pagination';

export const opportunityStatus = z.enum(['OPENED', 'LOSED', 'GAINED']);

export const findStageContentFilters = z.object({
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

export const findStageContentInput = z.object({
  stageId: z.number().int(),
  pagination: pagination,
  filters: findStageContentFilters
});

export const findStageContentOutput = z.object({
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
});

export type FindStageContentFilters = z.infer<typeof findStageContentFilters>;
export type FindStageContentOutput = z.infer<typeof findStageContentOutput>;
