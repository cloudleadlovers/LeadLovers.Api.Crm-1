import { Router } from "express";

import healthCheckRouter from "./monitor/healthCheck";

const routes = Router();

routes.use("/health", healthCheckRouter);

export default routes;
