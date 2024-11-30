import { Router } from "express";

import dashboardRouter from "./dashboard/dashboard";
import healthCheckRouter from "./monitor/healthCheck";

const routes = Router();

routes.use("/health", healthCheckRouter);
routes.use("/dashboard", dashboardRouter);

export default routes;
