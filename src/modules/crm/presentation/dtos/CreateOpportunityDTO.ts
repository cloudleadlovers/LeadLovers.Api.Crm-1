import { DealStatus } from '@common/shared/enums/DealStatus';
import { MachineType } from '@common/shared/enums/MachineType';
import { z } from 'zod';

const opportunityData = z.object({
  userId: z.number().int(),
  crmId: z.number().int(),
  stageId: z.number().int(),
  contactId: z.number().int().optional(),
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  commercialPhone: z.string().optional(),
  score: z.number().int().default(0),
  company: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  birthDate: z.date().optional(),
  tags: z.array(z.number()).optional(),
  value: z.number().int().default(0),
  responsible: z.object({
    id: z.number().int(),
    name: z.string(),
    icon: z.string()
  }),
  deal: z.object({
    state: z.nativeEnum(DealStatus),
    scheduleDate: z.date().optional()
  }),
  insertOnMachine: z.boolean(),
  machineType: z.number().int().default(1),
  machineId: z.number().int().default(0),
  funnelId: z.number().int().default(0),
  modelIndex: z.number().int().default(-1),
  dynamicFieldValues: z.record(z.string(), z.string()).default({})
});

const validateOpportunityData = (
  val: z.infer<typeof opportunityData>,
  ctx: z.RefinementCtx
) => {
  if (val.machineType != MachineType.WHATSAPP && !val.email) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Please provide an e-mail`
    });
  }
  if (val.machineType == MachineType.WHATSAPP && !val.phone) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Please provide a phone number`
    });
  }
};

export const createOpportunityInput = opportunityData.superRefine(
  validateOpportunityData
);

export const createOpportunityOutput = z.object({
  id: z.number().int()
});

export type CreateOpportunityInput = z.infer<typeof createOpportunityInput>;
export type CreateOpportunityOutput = z.infer<typeof createOpportunityOutput>;
