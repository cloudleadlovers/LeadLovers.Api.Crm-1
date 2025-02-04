import { LeadUsuaSist } from './IFindLeadUsuaSistRepository';

export interface IFindLeadUsuaSistByLeadCodiRepository {
  find(
    leadCodi: number,
    usuaSistCodi: number
  ): Promise<LeadUsuaSist | undefined>;
}
