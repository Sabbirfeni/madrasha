import { type Request, type Response, type NextFunction } from "express";
import { HttpStatus } from "../config/constants";
import type { ApiResponse } from "../types";

/**
 * Global error handling middleware
 * @param error - Error object
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error("Error:", error);

  const response: ApiResponse = {
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : error.message || "Something went wrong",
    timestamp: new Date().toISOString(),
  };

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
};

/**
 * 404 handler middleware
 * @param req - Express request object
 * @param res - Express response object
 */
export const notFoundHandler = (_req: Request, res: Response): void => {
  const response: ApiResponse = {
    success: false,
    message: "Route not found",
    timestamp: new Date().toISOString(),
  };

  res.status(HttpStatus.NOT_FOUND).json(response);
};
