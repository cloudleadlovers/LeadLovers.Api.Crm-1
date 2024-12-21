import { Router } from 'express';

import { FindCRMsHandler } from '@modules/crm/presentation/handlers/FindCRMsHandler';
import { authenticate } from 'infa/http/middlewares/authJWT';

const findCRMs = new FindCRMsHandler();

const crmRouter = Router();

crmRouter.use(authenticate);
crmRouter.get('/', findCRMs.handle);

export default crmRouter;
