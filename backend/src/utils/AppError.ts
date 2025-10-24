import { HttpStatus } from "../config/constants";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

  static getDefaultMessage(statusCode: number): string {
    switch (statusCode) {
      case HttpStatus.BAD_REQUEST:
        return "Bad request";
      case HttpStatus.UNAUTHORIZED:
        return "Unauthorized";
      case HttpStatus.FORBIDDEN:
        return "Forbidden";
      case HttpStatus.NOT_FOUND:
        return "Not found";
      case HttpStatus.CONFLICT:
        return "Conflict";
      case HttpStatus.UNPROCESSABLE_ENTITY:
        return "Unprocessable entity";
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return "Internal server error";
      default:
        return "An error occurred";
    }
  }
}
