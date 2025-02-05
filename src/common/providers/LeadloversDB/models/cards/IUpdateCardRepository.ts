import { CardStatus } from '@common/shared/enums/CardStatus';
import { Card } from './IFindCardsByColumnIdRepository';

export type UpdateCardParams = {
  columnId: number;
  cardId: number;
  status?: CardStatus;
  responsibleId?: number;
};

export type UpdateCardResponse = Omit<Card, 'gainedAt' | 'losedAt'> & {
  oldStatus: number;
  oldResponsibleId: number;
};

export interface IUpdateCardRepository {
  update(params: UpdateCardParams): Promise<UpdateCardResponse | undefined>;
}
