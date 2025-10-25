import express, { type Express } from "express";

import { applySecurityMiddleware } from "./middlewares/security";
import { applyCommonMiddleware } from "./middlewares/common";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import routes from "./routes";

const app: Express = express();

applySecurityMiddleware(app);
applyCommonMiddleware(app);

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
