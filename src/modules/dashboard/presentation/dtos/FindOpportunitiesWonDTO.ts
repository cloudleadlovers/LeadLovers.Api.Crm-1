import { z } from 'zod';

export const findOpportunitiesWonIntput = z
  .object({
    crmId: z.number().int(),
    limit: z.number().int(),
    lastId: z.number().int().optional(),
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
      .optional()
  })
  .transform(val => {
    return {
      ...val,
      pagination: {
        limit: val.limit,
        lastId: val.lastId
      },
      filters: {
        createInitialDate: val.closedInitialDate,
        createEndDate: val.closedEndDate,
        closedInitialDate: val.closedInitialDate,
        closedEndDate: val.closedEndDate,
        responsibles: val.responsibles
      }
    };
  });

export const findOpportunitiesWonOutput = z.object({
  totalWonValue: z.number().int(),
  totalOpportunities: z.number().int(),
  opportunities: z.array(
    z.object({
      id: z.number().int(),
      columnId: z.number().int(),
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      value: z.number().int(),
      responsible: z
        .object({
          id: z.number().int(),
          name: z.string()
        })
        .optional(),
      createdAt: z.date(),
      gainedAt: z.date()
    })
  ),
  nextCursor: z.number().int().optional()
});
