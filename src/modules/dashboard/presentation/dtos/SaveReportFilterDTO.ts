import { z } from 'zod';
import { filterDefault } from '../../shared/types/InsightFilter';

export const saveReportFilterIntput = z.object({
  userId: z.number().int(),
  name: z.string(),
  filters: filterDefault
});

export const saveReportFilterOutput = z.object({
  id: z.number().int()
});
