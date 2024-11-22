import { Router } from 'express';

import { HealthCheck } from '@modules/monitor/presentation/handlers/healthCheck';

const healthCheckHandler = new HealthCheck();
const healthCheckRouter = Router();

healthCheckRouter.get('/', healthCheckHandler.handle);

export default healthCheckRouter;
