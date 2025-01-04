import { Router } from 'express';

import { CreateConversionRateDashboardHandler } from '@modules/dashboard/presentation/handlers/CreateConversionRateDashboardHandler';
import { CreateRevenueReportDashboardHandler } from '@modules/dashboard/presentation/handlers/CreateRevenueReportDashboardHandler';
import { CreateTeamReportDashboardHandler } from '@modules/dashboard/presentation/handlers/CreateTeamReportDashboardHandler';
import { DeleteInsightFilterHandler } from '@modules/dashboard/presentation/handlers/DeleteInsightFilterHandler';
import { EditInsightFilterHandler } from '@modules/dashboard/presentation/handlers/EditInsightFilterHandler';
import { FindInsightFiltersByUserIdHandler } from '@modules/dashboard/presentation/handlers/FindInsightFiltersByUserIdHandler';
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
const dashboardRouter = Router();

dashboardRouter.use(authenticate);
dashboardRouter.post(
  '/conversion-rate-report',
  createConversionRateDashboard.handle
);
dashboardRouter.post('/revenue-report', createRevenueReportDashboard.handle);
dashboardRouter.post('/team-report', createTeamReportDashboard.handle);

dashboardRouter.post('/filters', saveInsightFilterHandler.handle);
dashboardRouter.get('/filters', findInsightFiltersByUserIdHandler.handle);
dashboardRouter.patch('/filters/:filterId', editInsightFilterHandler.handle);
dashboardRouter.delete('/filters/:filterId', deleteInsightFilterHandler.handle);

export default dashboardRouter;
