import { Router } from 'express';

import { AssignResponsibleToOpportunitiesHandler } from '@modules/crm/presentation/handlers/AssignResponsibleToOpportunityHandler';
import { CreateCRMHandler } from '@modules/crm/presentation/handlers/CreateCRMHandler';
import { CreateLayoutForOpportunitiesDisplayHandler } from '@modules/crm/presentation/handlers/CreateLayoutForOpportunitiesDisplayHandler';
import { CreateOpportunityHandler } from '@modules/crm/presentation/handlers/CreateOpportunityHandler';
import { CreateStageHandler } from '@modules/crm/presentation/handlers/CreateStageHandler';
import { FindContactsHandler } from '@modules/crm/presentation/handlers/FindContactsHandler';
import { FindCRMContentHandler } from '@modules/crm/presentation/handlers/FindCRMContentHandler';
import { FindCRMsHandler } from '@modules/crm/presentation/handlers/FindCRMsHandler';
import { FindMachinesHandler } from '@modules/crm/presentation/handlers/FindMachinesHandler';
import { FindMessagesHandler } from '@modules/crm/presentation/handlers/FindMessagesHandler';
import { FindOpportunityDisplayLayoutHandler } from '@modules/crm/presentation/handlers/FindOpportunityDisplayLayoutHandler';
import { FindPotentialOwnersHandler } from '@modules/crm/presentation/handlers/FindPotentialOwnersHandler';
import { FindSequencesHandler } from '@modules/crm/presentation/handlers/FindSequencesHandler';
import { FindStageContentHandler } from '@modules/crm/presentation/handlers/FindStageContentHandler';
import { FindStageTemplatesHandler } from '@modules/crm/presentation/handlers/FindStageTemplatesHandler';
import { RemoveStageHandler } from '@modules/crm/presentation/handlers/RemoveStageHandler';
import { UpdateCRMHandler } from '@modules/crm/presentation/handlers/UpdateCRMHandler';
import { UpdateStageHandler } from '@modules/crm/presentation/handlers/UpdateStageHandler';
import { authenticate } from 'infa/http/middlewares/authJWT';

const assignResponsibleToOpportunities =
  new AssignResponsibleToOpportunitiesHandler();
const createCRM = new CreateCRMHandler();
const CreateLayoutForOpportunitiesDisplay =
  new CreateLayoutForOpportunitiesDisplayHandler();
const createOpportunity = new CreateOpportunityHandler();
const createStage = new CreateStageHandler();
const findContacts = new FindContactsHandler();
const findCRMContent = new FindCRMContentHandler();
const findCRMs = new FindCRMsHandler();
const findMachines = new FindMachinesHandler();
const findMessages = new FindMessagesHandler();
const FindOpportunityDisplayLayout = new FindOpportunityDisplayLayoutHandler();
const findPotentialOwners = new FindPotentialOwnersHandler();
const findSequences = new FindSequencesHandler();
const findStageContent = new FindStageContentHandler();
const findStageTemplates = new FindStageTemplatesHandler();
const removeStage = new RemoveStageHandler();
const updateCRM = new UpdateCRMHandler();
const updateStage = new UpdateStageHandler();

const crmRouter = Router();

crmRouter.use(authenticate);

crmRouter.post('/', createCRM.handle);
crmRouter.get('/', findCRMs.handle);
crmRouter.get('/:crmId', findCRMContent.handle);
crmRouter.patch('/:crmId', updateCRM.handle);

crmRouter.post(
  '/:crmId/opportunities-display-layouts',
  CreateLayoutForOpportunitiesDisplay.handle
);
crmRouter.get(
  '/:crmId/opportunities-display-layouts',
  FindOpportunityDisplayLayout.handle
);

crmRouter.post('/:crmId/stages', createStage.handle);
crmRouter.get('/:crmId/stages/:stageId', findStageContent.handle);
crmRouter.patch('/:crmId/stages/:stageId', updateStage.handle);
crmRouter.delete('/:crmId/stages/:stageId', removeStage.handle);

crmRouter.post(
  '/:crmId/stages/:stageId/opportunities',
  createOpportunity.handle
);
crmRouter.patch(
  '/:crmId/add-responsible-to-opportunities',
  assignResponsibleToOpportunities.handle
);

crmRouter.get('/stages/templates', findStageTemplates.handle);

crmRouter.get('/machines', findMachines.handle);
crmRouter.get('/machines/:machineId/sequences', findSequences.handle);
crmRouter.get(
  '/machines/:machineId/sequences/:sequenceId/messages',
  findMessages.handle
);

crmRouter.get('/contacts', findContacts.handle);
crmRouter.get('/owners', findPotentialOwners.handle);

export default crmRouter;
