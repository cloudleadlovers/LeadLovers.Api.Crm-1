export type LeadUsuaSist = {
  id: number;
  leadCodi: number;
  leadEmail: string;
  statCodi: number;
};

export interface IFindLeadUsuaSistRepository {
  find(leadUsuaSistCodi: number): Promise<LeadUsuaSist | undefined>;
}
