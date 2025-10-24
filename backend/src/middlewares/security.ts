import { type Express } from "express";
import helmet from "helmet";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import { env } from "../config/env";

/**
 * Apply security middleware to Express app
 * @param app - Express application instance
 */
export const applySecurityMiddleware = (app: Express): void => {
  // Security headers
  app.use(helmet());

  // CORS configuration
  app.use(
    cors({
      origin: env.CLIENT_URL,
      credentials: true,
    })
  );

  // MongoDB injection protection
  app.use(mongoSanitize());
};
