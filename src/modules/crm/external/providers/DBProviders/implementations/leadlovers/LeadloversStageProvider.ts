import { inject, injectable } from 'tsyringe';

import { IFindColumnTemplatesRepository } from '@common/providers/LeadloversDB/models/boards/IFindColumnTemplatesRepository';
import { IFindColumnByTitleRepository } from '@common/providers/LeadloversDB/models/columns/IFindColumnByTitleRepository';
import { IFindColumnsByBoardIdRepository } from '@common/providers/LeadloversDB/models/columns/IFindColumnsByBoardIdRepository';
import { IInsertColumnRepository } from '@common/providers/LeadloversDB/models/columns/IInsertColumnRepository';
import { IInsertPipelineHistoryRepository } from '@common/providers/LeadloversDB/models/history/IInsertPipelineHistoryRepository';
import { LogType } from '@common/shared/enums/LogType';
import { LogData } from '@common/shared/types/LogData';
import { formatLogData } from '@common/utils/formatLogData';
import IStageProvider, {
  FindStageFilter,
  Stage,
  StageTemplate
} from '../../models/IStageProvider';

@injectable()
export default class LeadloversStageProvider implements IStageProvider {
  constructor(
    @inject('FindColumnByTitleRepository')
    private findColumnByTitleRepository: IFindColumnByTitleRepository,
    @inject('FindColumnTemplatesRepository')
    private findColumnTemplatesRepository: IFindColumnTemplatesRepository,
    @inject('FindColumnsByBoardIdRepository')
    private findColumnsByBoardIdRepository: IFindColumnsByBoardIdRepository,
    @inject('InsertColumnRepository')
    private insertColumnRepository: IInsertColumnRepository,
    @inject('InsertPipelineHistoryRepository')
    private insertPipelineHistoryRepository: IInsertPipelineHistoryRepository
  ) {}

  public async createStage(
    params: Pick<Stage, 'crmId' | 'name' | 'order' | 'color'>
  ): Promise<Pick<Stage, 'id'>> {
    const columnId = await this.insertColumnRepository.insert(
      params.crmId,
      params.name,
      params.order,
      params.color
    );
    return { id: columnId };
  }

  public async findStageByName(
    crmId: number,
    name: string
  ): Promise<Pick<Stage, 'id'> | undefined> {
    return await this.findColumnByTitleRepository.find(crmId, name);
  }

  public async findStageTemplates(): Promise<StageTemplate[]> {
    const columnTemplates = await this.findColumnTemplatesRepository.find();
    const stageTemplates: StageTemplate[] = [];
    columnTemplates.forEach(columnTemplate => {
      stageTemplates.push({
        id: columnTemplate.boardId,
        title: columnTemplate.boardTitle,
        stage: columnTemplates.reduce(
          (accumulator, column) => {
            if (column.boardId === columnTemplate.boardId) {
              accumulator.push({
                id: column.columnId,
                crmId: column.boardId,
                name: column.columnTitle,
                color: column.columnColor,
                order: column.columnOrder
              });
            }
            return accumulator;
          },
          [] as Pick<Stage, 'id' | 'crmId' | 'name' | 'color' | 'order'>[]
        )
      });
    });
    return stageTemplates;
  }

  public async findStagesByCRMId(
    crmId: number,
    filters?: FindStageFilter
  ): Promise<Stage[]> {
    const columnFilters = filters?.stage
      ? { column: filters.stage }
      : undefined;
    const columns = await this.findColumnsByBoardIdRepository.find(
      crmId,
      columnFilters
    );
    return columns.map(column => {
      return {
        id: column.id,
        crmId: column.boardId,
        name: column.name,
        color: column.color,
        order: column.order,
        amountCards: column.amountCards,
        earnedRevenue: column.earnedRevenue,
        createdAt: column.createdAt
      };
    });
  }

  public async logStageCreation(
    stageId: number,
    userId: number,
    data: LogData,
    subUserId?: number
  ): Promise<void> {
    await this.insertPipelineHistoryRepository.insert({
      columnId: stageId,
      usuaSistCodi: userId,
      acesCodi: subUserId,
      type: LogType.CREATED,
      data: formatLogData(data)
    });
  }
}
