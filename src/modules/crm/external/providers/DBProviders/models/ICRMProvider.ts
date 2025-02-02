import { CRMOwnerRole } from '@common/shared/enums/CRMOwnerRole';
import { CRMRule } from '@common/shared/enums/CRMRules';
import { LogData } from '@common/shared/types/LogData';
import { OpportunityLayout } from '@common/shared/types/OpportunityLayout';

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
  rule: CRMRule;
  createdAt: Date;
  opportunity: {
    overallQuantity: number;
    amountWonValue: number;
  };
  owners: CRMOwner[];
};

export type OpportunityDisplayLayout = {
  id: number;
  crmId: number;
  layout: OpportunityLayout;
  createdAt: Date;
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
  createLayoutForOpportunitiesDisplay(
    crmId: number,
    layout: OpportunityLayout
  ): Promise<void>;
  findCRM(
    crmId: number
  ): Promise<Omit<CRM, 'opportunity' | 'owners'> | undefined>;
  findCRMsByUserId(userId: number, filters?: FindCRMsFilters): Promise<CRM[]>;
  findOpportunityDisplayLayoutByCrmId(
    crmId: number
  ): Promise<OpportunityDisplayLayout | undefined>;
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
  updateCRM(
    params: Pick<CRM, 'id'> & Partial<Pick<CRM, 'logo' | 'name' | 'goal'>>
  ): Promise<void>;
}
