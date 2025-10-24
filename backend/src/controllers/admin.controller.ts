import { type Request, type Response } from "express";
import { HttpStatus } from "../config/constants";
import { ApiResponse } from "../types/common";
import { AppError } from "../utils/AppError";
import { Admin } from "../models/admin/admin.model";
import { generateStrongPassword } from "../models/admin/utils";
import { hashPassword } from "../utils/password";
import type { CreateAdminInput } from "../models/admin/types";

export const createAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    employee_id,
    access_boys_section,
    access_girls_section,
    access_residential_section,
  }: CreateAdminInput = req.body;

  const existingAdmin = await Admin.findOne({ employee_id });
  if (existingAdmin) {
    throw new AppError(
      "This employee is already an admin",
      HttpStatus.CONFLICT
    );
  }

  const plainPassword = generateStrongPassword();
  const hashedPassword = await hashPassword(plainPassword);

  const admin = await Admin.create({
    employee_id,
    password: hashedPassword,
    type: "admin",
    access_boys_section,
    access_girls_section,
    access_residential_section,
  });

  const response: ApiResponse = {
    success: true,
    message: "Admin created successfully",
    data: {
      name: "John Doe",
      phone: "+1234567890",
      type: admin.type,
      createdAt: admin.createdAt,
      password: plainPassword,
    },
    timestamp: new Date().toISOString(),
  };

  res.status(HttpStatus.CREATED).json(response);
};
