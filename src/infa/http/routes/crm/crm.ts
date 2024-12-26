import { Router } from 'express';

import { FindCRMsHandler } from '@modules/crm/presentation/handlers/FindCRMsHandler';
import { FindCRMTemplatesHandler } from '@modules/crm/presentation/handlers/FindCRMTemplatesHandler';
import { authenticate } from 'infa/http/middlewares/authJWT';

const findCRMs = new FindCRMsHandler();
const findCRMTemplates = new FindCRMTemplatesHandler();

const crmRouter = Router();

crmRouter.use(authenticate);
crmRouter.get('/', findCRMs.handle);
crmRouter.get('/templates', findCRMTemplates.handle);

export default crmRouter;
