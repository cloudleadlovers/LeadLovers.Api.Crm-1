import { z } from 'zod';

export const findPotentialOwnersDTO = z.array(
  z.object({
    id: z.number().int(),
    name: z.string(),
    photo: z.string()
  })
);
