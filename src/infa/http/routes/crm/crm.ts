import { Router } from 'express';

import { CreateCRMHandler } from '@modules/crm/presentation/handlers/CreateCRMHandler';
import { FindCRMsHandler } from '@modules/crm/presentation/handlers/FindCRMsHandler';
import { FindCRMTemplatesHandler } from '@modules/crm/presentation/handlers/FindCRMTemplatesHandler';
import { FindPotentialOwnersHandler } from '@modules/crm/presentation/handlers/FindPotentialOwnersHandler';
import { authenticate } from 'infa/http/middlewares/authJWT';

const createCRM = new CreateCRMHandler();
const findCRMs = new FindCRMsHandler();
const findCRMTemplates = new FindCRMTemplatesHandler();
const findPotentialOwners = new FindPotentialOwnersHandler();

const crmRouter = Router();

crmRouter.use(authenticate);
crmRouter.post('/', createCRM.handle);
crmRouter.get('/', findCRMs.handle);
crmRouter.get('/templates', findCRMTemplates.handle);
crmRouter.get('/owners', findPotentialOwners.handle);

export default crmRouter;
