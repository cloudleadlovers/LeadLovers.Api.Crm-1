import { Router } from 'express';

import { CreateConversionRateDashboardHandler } from '@modules/dashboard/presentation/handlers/CreateConversionRateDashboardHandler';
import { CreateRevenueReportDashboardHandler } from '@modules/dashboard/presentation/handlers/CreateRevenueReportDashboardHandler';
import { CreateTeamReportDashboardHandler } from '@modules/dashboard/presentation/handlers/CreateTeamReportDashboardHandler';
import { authenticate } from 'infa/http/middlewares/authJWT';

const createConversionRateDashboard =
  new CreateConversionRateDashboardHandler();
const createRevenueReportDashboard = new CreateRevenueReportDashboardHandler();
const createTeamReportDashboard = new CreateTeamReportDashboardHandler();
const dashboardRouter = Router();

dashboardRouter.use(authenticate);
dashboardRouter.post('/conversion-rate', createConversionRateDashboard.handle);
dashboardRouter.post('/revenue-report', createRevenueReportDashboard.handle);
dashboardRouter.post('/team-report', createTeamReportDashboard.handle);

export default dashboardRouter;
