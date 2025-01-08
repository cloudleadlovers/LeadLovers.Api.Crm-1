import { z } from 'zod';
import { filterDefault } from '../../shared/types/InsightFilter';

export const findInsightFiltersByUserIdOutput = z.object({
  filters: z.array(
    z.object({
      id: z.number().int(),
      userId: z.number().int(),
      name: z.string(),
      filters: filterDefault,
      createdAt: z.date()
    })
  )
});
