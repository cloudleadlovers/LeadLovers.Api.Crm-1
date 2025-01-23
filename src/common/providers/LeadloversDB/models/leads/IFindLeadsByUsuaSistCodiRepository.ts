import { Pagination } from '@common/shared/types/Pagination';

export type Lead = {
  id: number;
  email: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  company: string;
  createdAt: Date;
};

export interface IFindLeadsByUsuaSistCodiRepository {
  list(
    usuaSistCodi: number,
    pagination: Pagination,
    leadName?: string
  ): Promise<Lead[]>;
}
