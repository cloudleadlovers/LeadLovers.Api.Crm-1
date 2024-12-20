import { Router } from 'express';

import { CreateConversionRateDashboard } from '@modules/dashboard/presentation/CreateConversionRateDashboard';
import { CreateRevenueReportDashboard } from '@modules/dashboard/presentation/CreateRevenueReportDashboard';
import { CreateTeamReportDashboard } from '@modules/dashboard/presentation/CreateTeamReportDashboard';
import { authenticate } from 'infa/http/middlewares/authJWT';

const createConversionRateDashboardHandler =
  new CreateConversionRateDashboard();
const createRevenueReportDashboardHandler = new CreateRevenueReportDashboard();
const createTeamReportDashboardkHandler = new CreateTeamReportDashboard();
const dashboardRouter = Router();

dashboardRouter.use(authenticate);
dashboardRouter.post(
  '/conversion-rate',
  createConversionRateDashboardHandler.handle
);
dashboardRouter.post(
  '/revenue-report',
  createRevenueReportDashboardHandler.handle
);
dashboardRouter.post('/team-report', createTeamReportDashboardkHandler.handle);

export default dashboardRouter;
