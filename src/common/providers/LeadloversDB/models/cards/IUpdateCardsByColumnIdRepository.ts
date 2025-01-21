import { CardStatus } from '@common/shared/enums/CardStatus';
import { Card } from './IFindCardsByColumnIdRepository';

export type UpdateCardsParams = {
  columnId: number;
  status?: CardStatus;
};

export interface IUpdateCardsByColumnIdRepository {
  update(params: UpdateCardsParams): Promise<Pick<Card, 'id' | 'name'>[]>;
}
