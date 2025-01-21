import { CRMOwnerRole } from '@common/shared/enums/CRMOwnerRole';
import { LogData } from '@common/shared/types/LogData';

export type CRMOwner = {
  id: number;
  name: string;
  photo: string;
  roleId: number;
  roleName: CRMOwnerRole;
};

export type CRM = {
  id: number;
  userId: number;
  logo: string;
  name: string;
  goal: number;
  rule: 'all-crm' | 'only-one-per-column' | 'only-one-in-crm';
  createdAt: Date;
  opportunity: {
    overallQuantity: number;
    amountWonValue: number;
  };
  owners: CRMOwner[];
};

export type FindCRMsFilters = {
  createInitialDate?: string;
  createEndDate?: string;
  responsibleName?: string;
  roleId?: number;
};

export default interface ICRMProvider {
  assignOwnerToCRM(
    crmId: number,
    ownerId: number,
    roleId: number
  ): Promise<void>;
  createCRM(
    params: Pick<CRM, 'userId' | 'name' | 'goal' | 'rule' | 'logo'>
  ): Promise<Pick<CRM, 'id'>>;
  findCRM(
    crmId: number
  ): Promise<Omit<CRM, 'opportunity' | 'owners'> | undefined>;
  findCRMsByUserId(userId: number, filters?: FindCRMsFilters): Promise<CRM[]>;
  findPotentialOwnersByUserId(
    userId: number
  ): Promise<Pick<CRMOwner, 'id' | 'name' | 'photo'>[]>;
  findOwnersByCRMId(crmId: number): Promise<CRMOwner[]>;
  logCRMCreation(
    crmId: number,
    userId: number,
    data: LogData,
    subUserId?: number
  ): Promise<void>;
}
