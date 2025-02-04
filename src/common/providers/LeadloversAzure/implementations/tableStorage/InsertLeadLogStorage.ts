import { TableClient } from '@azure/data-tables';
import azure from '@common/config/azure';
import {
  IInsertLeadLogStorage,
  InsertLeadLogParams
} from '../../models/tableStorage/IInsertLeadLogStorage';

export class InsertLeadLogStorage implements IInsertLeadLogStorage {
  private client: TableClient;

  constructor() {
    const { tableStorageConnection, leadLogTableName } = azure.leadlovers;

    if (!tableStorageConnection || !leadLogTableName) {
      throw new Error('Missing azure envs!');
    }

    this.client = TableClient.fromConnectionString(
      tableStorageConnection,
      leadLogTableName
    );
  }

  async insert(params: InsertLeadLogParams): Promise<void> {
    const log = {
      user: params.userId,
      subUser: params.subuser ?? 0,
      action: 2,
      reference: 2,
      referenceId: params.leadCodi,
      lead: params.leadCodi,
      partitionKey: String(params.userId),
      rowKey: String(params.leadCodi),
      description: `Tags aplicadas manualmente: ${params.tags}`,
      date: new Date()
    };
    log.rowKey = `LEAD${log.rowKey}_ACT${log.action}_${crypto.randomUUID().toUpperCase().replace(/-/g, '')}`;
    await this.client.createEntity(log);
  }
}
