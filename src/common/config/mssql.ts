import 'dotenv/config';

export interface IConnection {
  server: string;
  port: number;
  database: string;
  user: string;
  password: string;
  requestTimeout: number;
  connectionTimeout: number;
  options: {
    trustServerCertificate: boolean;
  };
}

export interface IDatabase {
  name: string;
  connection: IConnection;
}

const databases: IDatabase[] = [
  {
    name: 'leadlovers',
    connection: {
      server: process.env.CONN_LEADLOVERS_SERVER || '',
      port: Number(process.env.CONN_PORT),
      database: process.env.CONN_LEADLOVERS_DATABASE || '',
      user: process.env.CONN_LEADLOVERS_USER || '',
      password: process.env.CONN_LEADLOVERS_PASS || '',
      requestTimeout: 120000,
      connectionTimeout: 120000,
      options: {
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
    }
  },
  {
    name: 'erros',
    connection: {
      server: process.env.CONN_ERRORS_SERVER || '',
      port: Number(process.env.CONN_PORT),
      database: process.env.CONN_ERRORS_DATABASE || '',
      user: process.env.CONN_ERRORS_USER || '',
      password: process.env.CONN_ERRORS_PASS || '',
      requestTimeout: 120000,
      connectionTimeout: 120000,
      options: {
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
    }
  }
];

export default {
  databases
};
