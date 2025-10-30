import { type Request, type Response, type NextFunction } from "express";
import { AppError } from "../../utils/AppError";
import { HttpStatus, UserRole } from "../../config/constants";

export const authorize = (allowedRoles: UserRole[]) => {
  return (_req: Request, res: Response, next: NextFunction): void => {
    const admin = res.locals.admin as { role?: number } | undefined;
    if (!admin || typeof admin.role !== "number") {
      return next(new AppError("Unauthorized", HttpStatus.UNAUTHORIZED));
    }

    if (!allowedRoles.includes(admin.role as UserRole)) {
      return next(new AppError("Forbidden", HttpStatus.FORBIDDEN));
    }

    next();
  };
};
