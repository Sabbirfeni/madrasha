import { type Request, type Response } from "express";
import { HttpStatus, UserRole } from "../config/constants";
import { ApiResponse } from "../types/common";
import { AppError } from "../utils/AppError";
import { Admin } from "../models/admin/admin.model";
import { Employee } from "../models/employee/employee.model";
import { generateStrongPassword } from "../models/admin/utils";
import { hashPassword } from "../utils/password";
import type { CreateAdminInput } from "../models/admin/types";
import mongoose from "mongoose";

export const createAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    role,
    employee_id,
    access_boys_section,
    access_girls_section,
    access_residential_section,
  }: CreateAdminInput = req.body;

  // Convert employee_id to ObjectId
  const employeeObjectId = new mongoose.Types.ObjectId(employee_id);

  const existingAdmin = await Admin.findOne({ employee_id: employeeObjectId });
  if (existingAdmin) {
    throw new AppError(
      "This employee is already an admin",
      HttpStatus.CONFLICT
    );
  }

  // Find the employee to get their details
  const employee = await Employee.findById(employeeObjectId);
  if (!employee) {
    throw new AppError("Employee not found", HttpStatus.NOT_FOUND);
  }

  const plainPassword = generateStrongPassword();
  const hashedPassword = await hashPassword(plainPassword);

  const admin = await Admin.create({
    role: role || UserRole.ADMIN,
    employee_id: employeeObjectId,
    password: hashedPassword,
    access_boys_section,
    access_girls_section,
    access_residential_section,
  });

  const response: ApiResponse = {
    success: true,
    message: "Admin created successfully",
    data: {
      fullname: employee.fullname,
      phone_number: employee.phone_number,
      role: admin.role,
      createdAt: admin.createdAt,
      password: plainPassword,
    },
    timestamp: new Date().toISOString(),
  };

  res.status(HttpStatus.CREATED).json(response);
};
