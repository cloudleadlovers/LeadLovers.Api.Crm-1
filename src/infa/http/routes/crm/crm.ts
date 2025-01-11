import { Router } from 'express';

import { CreateCRMHandler } from '@modules/crm/presentation/handlers/CreateCRMHandler';
import { FindCRMContentHandler } from '@modules/crm/presentation/handlers/FindCRMContentHandler';
import { FindCRMsHandler } from '@modules/crm/presentation/handlers/FindCRMsHandler';
import { FindCRMTemplatesHandler } from '@modules/crm/presentation/handlers/FindCRMTemplatesHandler';
import { FindPotentialOwnersHandler } from '@modules/crm/presentation/handlers/FindPotentialOwnersHandler';
import { FindStageContentHandler } from '@modules/crm/presentation/handlers/FindStageContentHandler';
import { authenticate } from 'infa/http/middlewares/authJWT';

const createCRM = new CreateCRMHandler();
const findCRMContent = new FindCRMContentHandler();
const findCRMs = new FindCRMsHandler();
const findCRMTemplates = new FindCRMTemplatesHandler();
const findPotentialOwners = new FindPotentialOwnersHandler();
const findStageContent = new FindStageContentHandler();

const crmRouter = Router();

crmRouter.use(authenticate);

crmRouter.post('/', createCRM.handle);
crmRouter.get('/', findCRMs.handle);
crmRouter.get('/:crmId', findCRMContent.handle);

crmRouter.get('/:crmId/stages/:stageId', findStageContent.handle);

crmRouter.get('/templates', findCRMTemplates.handle);
crmRouter.get('/owners', findPotentialOwners.handle);

export default crmRouter;
