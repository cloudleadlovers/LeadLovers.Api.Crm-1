import { z } from 'zod';
import { filterDefault } from '../../shared/types/InsightFilter';

export const editReportFilterIntput = z.object({
  id: z.number().int(),
  name: z.string().optional(),
  filters: filterDefault.optional()
});
