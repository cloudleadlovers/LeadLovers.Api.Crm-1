import { Router } from 'express';

import { CreateConversionRateDashboardHandler } from '@modules/dashboard/presentation/handlers/CreateConversionRateDashboardHandler';
import { CreateRevenueReportDashboardHandler } from '@modules/dashboard/presentation/handlers/CreateRevenueReportDashboardHandler';
import { CreateTeamReportDashboardHandler } from '@modules/dashboard/presentation/handlers/CreateTeamReportDashboardHandler';
import { DeleteInsightFilterHandler } from '@modules/dashboard/presentation/handlers/DeleteInsightFilterHandler';
import { EditInsightFilterHandler } from '@modules/dashboard/presentation/handlers/EditInsightFilterHandler';
import { FindInsightFiltersByUserIdHandler } from '@modules/dashboard/presentation/handlers/FindInsightFiltersByUserIdHandler';
import { FindOpportunitiesWonHandler } from '@modules/dashboard/presentation/handlers/FindOpportunitiesWonHandler';
import { SaveInsightFilterHandler } from '@modules/dashboard/presentation/handlers/SaveInsightFilterHandler';
import { authenticate } from 'infa/http/middlewares/authJWT';

const createConversionRateDashboard =
  new CreateConversionRateDashboardHandler();
const createRevenueReportDashboard = new CreateRevenueReportDashboardHandler();
const createTeamReportDashboard = new CreateTeamReportDashboardHandler();
const deleteInsightFilterHandler = new DeleteInsightFilterHandler();
const editInsightFilterHandler = new EditInsightFilterHandler();
const findInsightFiltersByUserIdHandler =
  new FindInsightFiltersByUserIdHandler();
const saveInsightFilterHandler = new SaveInsightFilterHandler();
const findOpportunitiesWon = new FindOpportunitiesWonHandler();

const insightsRouter = Router();

insightsRouter.use(authenticate);
insightsRouter.post(
  '/conversion-rate-report',
  createConversionRateDashboard.handle
);
insightsRouter.post('/revenue-report', createRevenueReportDashboard.handle);
insightsRouter.post('/team-report', createTeamReportDashboard.handle);

insightsRouter.get(
  '/crms/:crmId/opportunities-won',
  findOpportunitiesWon.handle
);

insightsRouter.post('/filters', saveInsightFilterHandler.handle);
insightsRouter.get('/filters', findInsightFiltersByUserIdHandler.handle);
insightsRouter.patch('/filters/:filterId', editInsightFilterHandler.handle);
insightsRouter.delete('/filters/:filterId', deleteInsightFilterHandler.handle);

export default insightsRouter;
