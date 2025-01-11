import { z } from 'zod';

export const pagination = z.object({
  limit: z.number().int(),
  lastId: z.number().int().optional()
});

export const resultPaginated = <T>(schema: z.ZodType<T>) => {
  return z.object({
    items: z.array(schema),
    nextCursor: z.number().int().optional()
  });
};

export type Pagination = z.infer<typeof pagination>;
export type ResultPaginated<T> = z.infer<ReturnType<typeof resultPaginated<T>>>;
