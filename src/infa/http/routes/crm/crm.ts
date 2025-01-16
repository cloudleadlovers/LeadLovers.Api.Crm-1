import { Router } from 'express';

import { CreateCRMHandler } from '@modules/crm/presentation/handlers/CreateCRMHandler';
import { CreateStageHandler } from '@modules/crm/presentation/handlers/CreateStageHandler';
import { FindCRMContentHandler } from '@modules/crm/presentation/handlers/FindCRMContentHandler';
import { FindCRMsHandler } from '@modules/crm/presentation/handlers/FindCRMsHandler';
import { FindPotentialOwnersHandler } from '@modules/crm/presentation/handlers/FindPotentialOwnersHandler';
import { FindStageContentHandler } from '@modules/crm/presentation/handlers/FindStageContentHandler';
import { FindStageTemplatesHandler } from '@modules/crm/presentation/handlers/FindStageTemplatesHandler';
import { UpdateStageHandler } from '@modules/crm/presentation/handlers/UpdateStageHandler';
import { authenticate } from 'infa/http/middlewares/authJWT';

const createCRM = new CreateCRMHandler();
const createStage = new CreateStageHandler();
const findCRMContent = new FindCRMContentHandler();
const findCRMs = new FindCRMsHandler();
const findPotentialOwners = new FindPotentialOwnersHandler();
const findStageContent = new FindStageContentHandler();
const findStageTemplates = new FindStageTemplatesHandler();
const updateStage = new UpdateStageHandler();

const crmRouter = Router();

crmRouter.use(authenticate);

crmRouter.post('/', createCRM.handle);
crmRouter.get('/', findCRMs.handle);
crmRouter.get('/:crmId', findCRMContent.handle);

crmRouter.post('/:crmId/stages', createStage.handle);
crmRouter.get('/:crmId/stages/:stageId', findStageContent.handle);
crmRouter.patch('/:crmId/stages/:stageId', updateStage.handle);

crmRouter.get('/stages/templates', findStageTemplates.handle);
crmRouter.get('/owners', findPotentialOwners.handle);

export default crmRouter;
