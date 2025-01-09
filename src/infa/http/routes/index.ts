import { Router } from "express";

import crmRouter from "./crm/crm";
import sessionRouter from "./identity/session";
import insightsRouter from "./insights/insights";
import healthCheckRouter from "./monitor/healthCheck";

const routes = Router();

routes.use("/crms", crmRouter);
routes.use("/insights", insightsRouter);
routes.use("/health", healthCheckRouter);
routes.use("/sessions", sessionRouter);

export default routes;
