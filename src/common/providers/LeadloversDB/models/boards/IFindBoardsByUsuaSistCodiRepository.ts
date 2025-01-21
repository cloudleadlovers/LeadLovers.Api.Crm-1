import { Board } from './IFindBoardRepository';

export type FindBoardsFilters = {
  createInitialDate?: string;
  createEndDate?: string;
};

export interface IFindBoardsByUsuaSistCodiRepository {
  find(usuaSistCodi: number, filter?: FindBoardsFilters): Promise<Board[]>;
}
