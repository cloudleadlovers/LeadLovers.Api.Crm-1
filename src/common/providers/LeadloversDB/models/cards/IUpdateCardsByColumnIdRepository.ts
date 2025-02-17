import { CardStatus } from '@common/shared/enums/CardStatus';
import { Card } from './IFindCardsByColumnIdRepository';

export type UpdateCardsByColumnIdParams = {
  columnId: number;
  status?: CardStatus;
  responsibleId?: number;
};

export type UpdateCardsByColumnIdResponse = Omit<
  Card,
  'gainedAt' | 'losedAt'
> & {
  oldStatus: number;
  oldResponsibleId: number;
};

export interface IUpdateCardsByColumnIdRepository {
  update(
    params: UpdateCardsByColumnIdParams
  ): Promise<UpdateCardsByColumnIdResponse[]>;
}
