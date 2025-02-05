import { inject, injectable } from 'tsyringe';

import { IFindColumnTemplatesRepository } from '@common/providers/LeadloversDB/models/boards/IFindColumnTemplatesRepository';
import { IDecrementsCardsPositionByColumnIdAndPositionRepository } from '@common/providers/LeadloversDB/models/cards/IDecrementsCardsPositionByColumnIdAndPositionRepository';
import { IFindColumnByTitleRepository } from '@common/providers/LeadloversDB/models/columns/IFindColumnByTitleRepository';
import { IFindColumnRepository } from '@common/providers/LeadloversDB/models/columns/IFindColumnRepository';
import { IFindColumnsByBoardIdRepository } from '@common/providers/LeadloversDB/models/columns/IFindColumnsByBoardIdRepository';
import { IInsertColumnRepository } from '@common/providers/LeadloversDB/models/columns/IInsertColumnRepository';
import { IUpdateColumnRepository } from '@common/providers/LeadloversDB/models/columns/IUpdateColumnRepository';
import { IInsertPipelineHistoryRepository } from '@common/providers/LeadloversDB/models/history/IInsertPipelineHistoryRepository';
import { IRemoveColumnNotificationRepository } from '@common/providers/LeadloversDB/models/notifications/IRemoveColumnNotificationRepository';
import { ColumnStatus } from '@common/shared/enums/ColumnStatus';
import { LogType } from '@common/shared/enums/LogType';
import { StageStatus } from '@common/shared/enums/StageStatus';
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
    @inject('DecrementsCardsPositionByColumnIdAndPositionRepository')
    private decrementsCardsPositionByColumnIdAndPositionRepository: IDecrementsCardsPositionByColumnIdAndPositionRepository,
    @inject('FindColumnRepository')
    private findColumnRepository: IFindColumnRepository,
    @inject('FindColumnByTitleRepository')
    private findColumnByTitleRepository: IFindColumnByTitleRepository,
    @inject('FindColumnTemplatesRepository')
    private findColumnTemplatesRepository: IFindColumnTemplatesRepository,
    @inject('FindColumnsByBoardIdRepository')
    private findColumnsByBoardIdRepository: IFindColumnsByBoardIdRepository,
    @inject('InsertColumnRepository')
    private insertColumnRepository: IInsertColumnRepository,
    @inject('InsertPipelineHistoryRepository')
    private insertPipelineHistoryRepository: IInsertPipelineHistoryRepository,
    @inject('RemoveColumnNotificationRepository')
    private removeColumnNotificationRepository: IRemoveColumnNotificationRepository,
    @inject('UpdateColumnRepository')
    private updateColumnRepository: IUpdateColumnRepository
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

  public async deleteNotificationByStageId(stageId: number): Promise<void> {
    await this.removeColumnNotificationRepository.remove(stageId);
  }

  public async deleteStage(
    params: Pick<Stage, 'crmId' | 'id'>
  ): Promise<Pick<Stage, 'name'> | undefined> {
    return await this.updateColumnRepository.update({
      boardId: params.crmId,
      columnId: params.id,
      status: this.getColumnStatus(StageStatus.REMOVED)
    });
  }

  public async findStage(
    stageId: number
  ): Promise<Omit<Stage, 'amountCards' | 'earnedRevenue'> | undefined> {
    const column = await this.findColumnRepository.find(stageId);
    if (!column) return undefined;
    return {
      id: column.id,
      crmId: column.boardId,
      name: column.name,
      color: column.color,
      order: column.order,
      status: this.getStageStatus(column.status),
      estimatedRevenue: column.value,
      createdAt: column.createdAt
    };
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
        status: this.getStageStatus(column.status),
        estimatedRevenue: column.value,
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

  public async logStageRemoval(
    stageId: number,
    userId: number,
    data: LogData,
    subUserId?: number
  ): Promise<void> {
    await this.insertPipelineHistoryRepository.insert({
      columnId: stageId,
      usuaSistCodi: userId,
      acesCodi: subUserId,
      type: LogType.REMOVED,
      data: formatLogData(data)
    });
  }

  public async logStageUpdating(
    stageId: number,
    userId: number,
    data: LogData,
    subUserId?: number
  ): Promise<void> {
    await this.insertPipelineHistoryRepository.insert({
      columnId: stageId,
      usuaSistCodi: userId,
      acesCodi: subUserId,
      type: LogType.UPDATED,
      data: formatLogData(data)
    });
  }

  public async reorderOpportunitiesByPosition(
    stageId: number,
    position: number
  ): Promise<void> {
    await this.decrementsCardsPositionByColumnIdAndPositionRepository.decrements(
      stageId,
      position
    );
  }

  public async updateStage(
    params: Pick<Stage, 'crmId' | 'id'> &
      Partial<
        Pick<Stage, 'name' | 'color' | 'status' | 'estimatedRevenue' | 'order'>
      >
  ): Promise<void> {
    await this.updateColumnRepository.update({
      boardId: params.crmId,
      columnId: params.id,
      title: params.name,
      color: params.color,
      status: params.status
        ? this.getColumnStatus(params.status)
        : params.status,
      order: params.order,
      value: params.estimatedRevenue
    });
  }

  private getStageStatus(statusId: number): StageStatus {
    switch (statusId) {
      case 1:
        return StageStatus.ACTIVE;
      case 2:
        return StageStatus.REMOVED;
      default:
        return StageStatus.REMOVED;
    }
  }

  private getColumnStatus(stageStatus: StageStatus): ColumnStatus {
    switch (stageStatus) {
      case StageStatus.ACTIVE:
        return ColumnStatus.ACTIVE;
      case StageStatus.REMOVED:
        return ColumnStatus.REMOVED;
      default:
        return ColumnStatus.REMOVED;
    }
  }
}
