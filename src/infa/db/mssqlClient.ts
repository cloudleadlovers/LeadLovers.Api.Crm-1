import mssql from 'mssql';

import settings, { IConnection } from '@common/config/mssql';

function getConnection(name: string): IConnection {
  const { databases } = settings;
  const database = databases.find(x => x.name === name);
  if (!database) throw new Error(`Connection with name '${name}' not found!`);
  return database.connection;
}

export async function mssqlPoolConnect(
  databaseName = 'leadlovers'
): Promise<mssql.ConnectionPool> {
  const poolPromisse = new mssql.ConnectionPool(
    getConnection(databaseName)
  ).connect();
  return poolPromisse;
}
