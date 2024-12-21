import { z } from 'zod';

export const findCRMsIntput = z.object({
  userId: z.number().int(),
  filters: z
    .object({
      createInitialDate: z.string().optional(),
      createEndDate: z.string().optional(),
      responsibleName: z.string().optional(),
      roleId: z.number().int().optional()
    })
    .optional()
});

export const findCRMsOutput = z.array(
  z.object({
    id: z.number().int(),
    logo: z.string(),
    title: z.string(),
    goal: z.number().int(),
    createdAt: z.date(),
    opportunity: z.object({
      overallQuantity: z.number().int(),
      amountWonValue: z.number().int()
    }),
    responsible: z.array(
      z.object({
        id: z.number().int(),
        name: z.string(),
        photo: z.string(),
        roleId: z.number().int(),
        roleName: z.enum(['Reader', 'Editor', 'Administrator'])
      })
    )
  })
);
