import { CardLayout } from '@common/shared/types/CardLayout';

export type Layout = {
  id: number;
  boardId: number;
  layout: CardLayout;
  createdAt: Date;
};

export interface IFindCardLayoutByBoardIdRepository {
  find(boardId: number): Promise<Layout | undefined>;
}
