import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { HttpStatus } from "../../config/constants";
import { AppError } from "../../utils/AppError";
import type { AuthenticatedAdmin } from "./types";
import { Admin } from "../../models/admin/admin.model";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const header = req.header("Authorization");
  if (!header || !header.startsWith("Bearer ")) {
    return next(
      new AppError(
        "Missing or invalid Authorization header",
        HttpStatus.UNAUTHORIZED
      )
    );
  }

  const token = header.slice(7);
  try {
    const decoded = jwt.verify(
      token,
      env.JWT_ACCESS_SECRET
    ) as AuthenticatedAdmin;

    if (!decoded?.sub || typeof decoded.role !== "number") {
      return next(
        new AppError("Invalid token payload", HttpStatus.UNAUTHORIZED)
      );
    }

    const exists = await Admin.exists({ _id: decoded.sub });
    if (!exists) {
      return next(
        new AppError("Admin no longer exists", HttpStatus.UNAUTHORIZED)
      );
    }

    res.locals.admin = decoded;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return next(new AppError("Token expired", HttpStatus.UNAUTHORIZED));
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new AppError("Invalid token", HttpStatus.UNAUTHORIZED));
    }
    return next(err as Error);
  }
};
