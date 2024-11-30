import { Router } from 'express';

import { HealthCheck } from '@modules/monitor/presentation/handlers/HealthCheck';

const healthCheckHandler = new HealthCheck();
const healthCheckRouter = Router();

healthCheckRouter.get('/', healthCheckHandler.handle);

export default healthCheckRouter;
