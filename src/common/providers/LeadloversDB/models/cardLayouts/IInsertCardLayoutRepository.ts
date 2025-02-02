import { CardLayout } from '@common/shared/types/CardLayout';

export type InsertCardLayoutParams = {
  boardId: number;
  layout: CardLayout;
};

export interface IInsertCardLayoutRepository {
  insert(params: InsertCardLayoutParams): Promise<void>;
}
