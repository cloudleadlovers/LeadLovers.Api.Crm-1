import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import corsOptions from '@common/config/cors';
import { doGracefullShutdown } from '@common/utils/gracefullShutdown';
import server from 'common/config/server';
import { logger } from 'infa/logger/pinoLogger';
import routes from './routes';

import '@common/providers';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(routes);
const port = server.port;

async function main() {
  app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
  doGracefullShutdown(app);
}

main();
