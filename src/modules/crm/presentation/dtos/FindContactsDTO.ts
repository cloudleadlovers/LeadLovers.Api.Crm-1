import { z } from 'zod';

export const findContactsInput = z
  .object({
    userId: z.number().int(),
    limit: z.number().int(),
    lastId: z.number().int().optional(),
    name: z.string().optional()
  })
  .transform(val => {
    return {
      ...val,
      pagination: {
        limit: val.limit,
        lastId: val.lastId
      }
    };
  });

export const findContactsOutput = z.array(
  z.object({
    id: z.number().int(),
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    company: z.string().optional(),
    createdAt: z.date()
  })
);
