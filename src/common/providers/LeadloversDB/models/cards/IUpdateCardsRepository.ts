import { CardStatus } from '@common/shared/enums/CardStatus';
import { Card } from './IFindCardsByColumnIdRepository';

export type UpdateCardsParams = {
  cardIds: number[];
  columnId?: number;
  position?: number;
  responsibleId?: number;
  setSequencialPosition?: boolean;
  status?: CardStatus;
};

export type UpdateCardsResponse = Omit<Card, 'gainedAt' | 'losedAt'> & {
  oldColumnId: number;
  oldPosition: number;
  oldResponsibleId: number;
  oldStatus: number;
};

export interface IUpdateCardsRepository {
  update(params: UpdateCardsParams): Promise<UpdateCardsResponse[]>;
}
