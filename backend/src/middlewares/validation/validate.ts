import { type Request, type Response, type NextFunction } from "express";
import { type ZodSchema } from "zod";
import { AppError } from "../../utils/AppError";
import { HttpStatus } from "../../config/constants";

export const validate = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof Error) {
        throw new AppError(
          `Validation failed: ${error.message}`,
          HttpStatus.BAD_REQUEST
        );
      }
      throw new AppError("", HttpStatus.BAD_REQUEST);
    }
  };
};
