export type DealStatus = 'OPENED' | 'LOSED' | 'GAINED';

export type PipelineReportsFilters = {
  stateCards?: DealStatus[];
  createInitialDate?: string;
  createEndDate?: string;
  closedInitialDate?: string;
  closedEndDate?: string;
  responsibleId?: number;
};

export type PipelineReportsQueryFilters = {
  status?: string;
  closedDate?: string;
  user?: string;
  showGain: boolean;
};

export type ConversionRateGraphData = {
  columnId: number;
  columnName: string;
  columnCards: number;
  columnAmount: number;
  columnType: string;
  winCountCardsInColumn: number | null;
  winAmountCardsInColumn: number;
};

export interface IFindConversionRateGraphDataRepository {
  find(
    boardId: number,
    pipelineFilters?: PipelineReportsFilters
  ): Promise<ConversionRateGraphData[]>;
}
