import { CardStatus } from '@common/shared/enums/CardStatus';

export type UpdateCardParams = {
  columnId: number;
  cardId: number;
  status?: CardStatus;
};

export interface IUpdateCardRepository {
  update(params: UpdateCardParams): Promise<void>;
}
