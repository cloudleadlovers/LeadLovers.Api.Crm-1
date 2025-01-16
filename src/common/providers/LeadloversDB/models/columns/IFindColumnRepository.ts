import { ColumnStatus } from '@common/shared/enums/ColumnStatus';

export type Column = {
  id: number;
  boardId: number;
  name: string;
  color: string;
  order: number;
  status: ColumnStatus;
  value: number;
  amountCards: number;
  earnedRevenue: number;
  createdAt: Date;
};

export interface IFindColumnRepository {
  find(
    columnId: number
  ): Promise<Omit<Column, 'amountCards' | 'earnedRevenue'> | undefined>;
}
