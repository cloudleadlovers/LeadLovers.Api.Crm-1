import { DealStatus } from '@common/shared/enums/DealStatus';
import { MachineType } from '@common/shared/enums/MachineType';
import { Pagination, ResultPaginated } from '@common/shared/types/Pagination';

export type Opportunity = {
  id: number;
  userId: number;
  stageId: number;
  contactId: number;
  name: string;
  email: string;
  phone: string;
  commercialPhone?: string;
  score: number;
  tags?: string;
  value: number;
  responsible: {
    id: number;
    name: string;
    icon: string;
  };
  deal: {
    state: DealStatus;
    scheduleDate?: Date;
  };
  position: number;
  createdAt: Date;
  gainedAt?: Date;
  losedAt?: Date;
};

export type FindOpportunityFilter = {
  name?: string;
  createInitialDate?: string;
  createEndDate?: string;
  closedInitialDate?: string;
  closedEndDate?: string;
  responsibles?: {
    in?: number[];
    notIn?: number[];
    isNull?: boolean;
  };
  state?: ('OPENED' | 'LOSED' | 'GAINED')[];
  value?: {
    greaterThan?: number;
    lessThan?: number;
    equalTo?: number;
  };
};

export type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  company: string;
  createdAt: Date;
};

export type Machine = {
  id: number;
  name: string;
};

export type Message = {
  id: number;
  name: string;
};

export type Sequence = {
  id: number;
  name: string;
};

export type OpportunityLogParams = {
  stage: {
    sourceId?: number;
    destinationId?: number;
  };
  opportunity: {
    id: number;
    dataBefore?: Omit<Opportunity, 'gainedAt' | 'losedAt'>;
    dataAfter?: Omit<Opportunity, 'gainedAt' | 'losedAt'>;
  };
  userId: number;
  subUserId?: number;
};

export default interface IOpportunityProvider {
  assignResponsibleToOpportunity(
    stageId: number,
    opportunityId: number,
    responsibleId: number
  ): Promise<
    | {
        oldValues: { responsibleId: number };
        currentValues: Omit<Opportunity, 'gainedAt' | 'losedAt'>;
      }
    | undefined
  >;
  createOpportunity(
    params: Omit<
      Opportunity,
      'id' | 'position' | 'gainedAt' | 'losedAt' | 'createdAt'
    >
  ): Promise<Pick<Opportunity, 'id' | 'position' | 'createdAt'>>;
  deleteNotificationByOpportunityId(opportunityId: number): Promise<void>;
  deleteNotificationsByOpportunityIds(opportunityIds: number[]): Promise<void>;
  deleteOpportunity(stageId: number, opportunityId: number): Promise<void>;
  deleteOpportunitiesByStageId(stageId: number): Promise<
    {
      oldValues: { status: number };
      currentValues: Omit<Opportunity, 'gainedAt' | 'losedAt'>;
    }[]
  >;
  findContacts(
    userId: number,
    pagination: Pagination,
    contactName?: string
  ): Promise<ResultPaginated<Contact>>;
  findMachines(
    userId: number,
    pagination: Pagination
  ): Promise<ResultPaginated<Machine>>;
  findMessages(
    machineType: MachineType,
    sequenceId: number,
    pagination: Pagination
  ): Promise<ResultPaginated<Message>>;
  findOpportunityByCRMIdAndContactId(
    crmId: number,
    contactId: number
  ): Promise<Pick<Opportunity, 'id'> | undefined>;
  findOpportunityByStageIdAndContactId(
    stageId: number,
    contactId: number
  ): Promise<Pick<Opportunity, 'id'> | undefined>;
  findOpportunitiesByStageId(
    stageId: number,
    pagination?: Pagination,
    filters?: FindOpportunityFilter
  ): Promise<ResultPaginated<Opportunity>>;
  findSequences(
    machineId: number,
    pagination: Pagination
  ): Promise<ResultPaginated<Sequence>>;
  logOpportunityCreation(params: OpportunityLogParams): Promise<void>;
  logOpportunityRemoval(params: OpportunityLogParams): Promise<void>;
  logResponsibleAssignmentToOpportunity(
    params: OpportunityLogParams
  ): Promise<void>;
}
