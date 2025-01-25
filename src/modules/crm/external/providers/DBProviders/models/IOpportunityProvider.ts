import { MachineType } from '@common/shared/enums/MachineType';
import { LogData } from '@common/shared/types/LogData';
import { Pagination, ResultPaginated } from '@common/shared/types/Pagination';

export type Opportunity = {
  id: number;
  stageId: number;
  name: string;
  email: string;
  phone: string;
  value: number;
  responsible: {
    id: number;
    name: string;
    icon: string;
  };
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
  stateCards?: ('OPENED' | 'LOSED' | 'GAINED')[];
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

export default interface IOpportunityProvider {
  deleteNotificationByOpportunityId(opportunityId: number): Promise<void>;
  deleteNotificationsByOpportunityIds(opportunityIds: number[]): Promise<void>;
  deleteOpportunity(stageId: number, opportunityId: number): Promise<void>;
  deleteOpportunitiesByStageId(
    stageId: number
  ): Promise<Pick<Opportunity, 'id' | 'name'>[]>;
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
  findOpportunitiesByStageId(
    stageId: number,
    pagination?: Pagination,
    filters?: FindOpportunityFilter
  ): Promise<ResultPaginated<Opportunity>>;
  findSequences(
    machineId: number,
    pagination: Pagination
  ): Promise<ResultPaginated<Sequence>>;
  logOpportunityRemoval(
    stageId: number,
    opportunityId: number,
    userId: number,
    data: LogData,
    subUserId?: number
  ): Promise<void>;
}
