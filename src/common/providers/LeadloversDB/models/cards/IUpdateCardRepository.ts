import { CardStatus } from '@common/shared/enums/CardStatus';
import { Card } from './IFindCardsByColumnIdRepository';

export type UpdateCardParams = {
  cardId: number;
  columnId?: number;
  position?: number;
  responsibleId?: number;
  setSequencialPosition?: boolean;
  status?: CardStatus;
};

export type UpdateCardResponse = Omit<Card, 'gainedAt' | 'losedAt'> & {
  oldColumnId: number;
  oldPosition: number;
  oldResponsibleId: number;
  oldStatus: number;
};

export interface IUpdateCardRepository {
  update(params: UpdateCardParams): Promise<UpdateCardResponse | undefined>;
}
