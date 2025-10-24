import { type Request, type Response, type NextFunction } from "express";
import { HttpStatus } from "../config/constants";
import { ApiResponse } from "../types/common";
import { AppError } from "../utils/AppError";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error("Error:", error);

  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let message = "Internal server error";

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message || AppError.getDefaultMessage(statusCode);
  } else if (error.name === "ValidationError") {
    statusCode = HttpStatus.BAD_REQUEST;
    message = `Validation failed: ${error.message}`;
  } else if (error.name === "CastError") {
    statusCode = HttpStatus.BAD_REQUEST;
    message = "Invalid ID format";
  } else if ((error as any).code === 11000) {
    statusCode = HttpStatus.CONFLICT;
    message = "Duplicate entry found";
  } else if (process.env.NODE_ENV !== "production") {
    message = error.message || "Something went wrong";
  }

  const response: ApiResponse = {
    success: false,
    message,
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(response);
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
