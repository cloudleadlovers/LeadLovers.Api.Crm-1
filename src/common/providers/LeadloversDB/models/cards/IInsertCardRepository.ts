import { Card } from './IFindCardsByColumnIdRepository';

export type InsertCardParams = {
  usuaSistCodi: number;
  columnId: number;
  leadCodi: number;
  leadEmail: string;
  leadName: string;
  leadPhone: string;
  leadCommercialPhone?: string;
  leadScore?: number;
  leadTags?: string;
  value: number;
  dealStatus?: number;
  dealScheduleDate?: Date;
  notifications?: boolean;
  acesCodi?: number;
};

export interface IInsertCardRepository {
  insert(
    params: InsertCardParams
  ): Promise<Pick<Card, 'id' | 'position' | 'createdAt'>>;
}
