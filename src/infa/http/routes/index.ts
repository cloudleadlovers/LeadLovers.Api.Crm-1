import { Router } from "express";

import dashboardRouter from "./dashboard/dashboard";
import sessionRouter from "./identity/session";
import healthCheckRouter from "./monitor/healthCheck";

const routes = Router();

routes.use("/dashboards", dashboardRouter);
routes.use("/health", healthCheckRouter);
routes.use("/sessions", sessionRouter);

export default routes;
