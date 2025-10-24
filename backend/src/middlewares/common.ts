import express, { type Express } from "express";
import cookieParser from "cookie-parser";

/**
 * Apply common middleware to Express app
 * @param app - Express application instance
 */
export const applyCommonMiddleware = (app: Express): void => {
  // Body parsing middleware
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Cookie parser
  app.use(cookieParser());
};
