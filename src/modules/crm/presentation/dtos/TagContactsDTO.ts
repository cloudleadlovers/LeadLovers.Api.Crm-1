import { z } from 'zod';

export const tagContactsInput = z.object({
  userId: z.number().int(),
  contactIds: z.array(z.number().int()),
  tagIds: z.array(z.number().int())
});

export type TagContactsInput = z.infer<typeof tagContactsInput>;
