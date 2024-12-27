export type CRMOwner = {
  id: number;
  name: string;
  photo: string;
  roleId: number;
  roleName: string;
};

export type CRM = {
  id: number;
  userId: number;
  logo: string;
  title: string;
  goal: number;
  rule: 'all-crm' | 'only-one-per-column' | 'only-one-in-crm';
  createdAt: Date;
  opportunity: {
    overallQuantity: number;
    amountWonValue: number;
  };
  owners: CRMOwner[];
};

export type CRMStage = {
  id: number;
  crmId: number;
  title: string;
  color: string;
  order: number;
};

export type CRMTemplate = {
  id: number;
  title: string;
  stage: Omit<CRMStage, 'crmId'>[];
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
    params: Pick<CRM, 'userId' | 'title' | 'goal' | 'rule' | 'logo'>
  ): Promise<Pick<CRM, 'id'>>;
  createCRMStage(
    params: Pick<CRMStage, 'crmId' | 'title' | 'order'>
  ): Promise<void>;
  findCRMsByUserId(userId: number, filters?: FindCRMsFilters): Promise<CRM[]>;
  findCRMTemplates(): Promise<CRMTemplate[]>;
  findPotentialOwnersByUserId(
    userId: number
  ): Promise<Pick<CRMOwner, 'id' | 'name' | 'photo'>[]>;
}
