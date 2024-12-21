export type Resposible = {
  id: number;
  name: string;
  photo: string;
  roleId: number;
};

export type FindResponsiblesFilters = {
  responsibleName?: string;
  roleId?: number;
};

export interface IFindBoardResponsiblesRepository {
  find(
    boardId: number,
    filters?: FindResponsiblesFilters
  ): Promise<Resposible[]>;
}
