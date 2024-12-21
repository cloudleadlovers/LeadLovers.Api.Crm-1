export type CRM = {
  id: number;
  logo: string;
  title: string;
  goal: number;
  createdAt: Date;
  opportunity: {
    overallQuantity: number;
    amountWonValue: number;
  };
  responsible: {
    id: number;
    name: string;
    photo: string;
    roleId: number;
    roleName: string;
  }[];
};

export type FindCRMsFilters = {
  createInitialDate?: string;
  createEndDate?: string;
  responsibleName?: string;
  roleId?: number;
};

export default interface ICRMProvider {
  findCRMsByUserId(userId: number, filters?: FindCRMsFilters): Promise<CRM[]>;
}
