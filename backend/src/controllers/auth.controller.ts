import { type Request, type Response } from "express";
import { HttpStatus } from "../config/constants";
import { type ApiResponse } from "../types/common";
import { AppError } from "../utils/AppError";
import { Employee } from "../models/employee/employee.model";
import { Admin } from "../models/admin/admin.model";
import type { EmployeeDocument } from "../models/employee/types";
import type { AdminDocument } from "../models/admin/types";
import { comparePassword } from "../utils/password";
import { signAccessToken } from "../utils/jwt";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { phone_number, password } = req.body as {
    phone_number: string;
    password: string;
  };

  const employee = (await Employee.findOne({ phone_number })) as
    | (EmployeeDocument & { _id: any })
    | null;
  if (!employee) {
    throw new AppError("Employee not found", HttpStatus.NOT_FOUND);
  }

  const admin = (await Admin.findOne({
    employee_id: employee._id,
  })) as (AdminDocument & { _id: any }) | null;
  if (!admin) {
    throw new AppError("Admin not found", HttpStatus.NOT_FOUND);
  }

  const {
    _id: adminId,
    password: adminPassword,
    role,
    access_boys_section,
    access_girls_section,
    access_residential_section,
  } = admin;

  const { _id: employeeId, fullname, phone_number: employeePhone } = employee;

  const isValid = await comparePassword(password, adminPassword);
  if (!isValid) {
    throw new AppError("Invalid credentials", HttpStatus.UNAUTHORIZED);
  }

  const token = signAccessToken({
    sub: String(adminId),
    employee_id: String(employeeId),
    role,
    permissions: {
      access_boys_section,
      access_girls_section,
      access_residential_section,
    },
  });

  const response: ApiResponse = {
    success: true,
    message: "Login successful",
    data: {
      token,
      admin: {
        fullname,
        phone_number: employeePhone,
        role,
        permissions: {
          access_boys_section,
          access_girls_section,
          access_residential_section,
        },
      },
    },
    timestamp: new Date().toISOString(),
  };

  res.status(HttpStatus.OK).json(response);
};
