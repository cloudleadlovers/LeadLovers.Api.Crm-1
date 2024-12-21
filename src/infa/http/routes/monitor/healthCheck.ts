import { Router } from 'express';

import { HealthCheckHandler } from '@modules/monitor/presentation/handlers/HealthCheckHandler';

const healthCheck = new HealthCheckHandler();
const healthCheckRouter = Router();

healthCheckRouter.get('/', healthCheck.handle);

export default healthCheckRouter;
