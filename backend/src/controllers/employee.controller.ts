import { type Request, type Response } from "express";
import { HttpStatus } from "../config/constants";
import { ApiResponse } from "../types/common";
import { AppError } from "../utils/AppError";
import { Employee } from "../models/employee/employee.model";
import type { CreateEmployeeInput } from "../models/employee/types";

export const createEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    branch,
    role,
    designation,
    fullname,
    profile_image,
    nid_no,
    gender,
    phone_number,
    join_date,
    resign_date,
    salary,
    bonus,
    current_location,
    permanent_location,
  }: CreateEmployeeInput = req.body;

  // Check if employee with same phone number exists
  const existingEmployee = await Employee.findOne({ phone_number });
  if (existingEmployee) {
    throw new AppError(
      "Employee with this phone number already exists",
      HttpStatus.CONFLICT
    );
  }

  // Create new employee
  await Employee.create({
    branch,
    role,
    designation,
    fullname,
    profile_image,
    nid_no,
    gender,
    phone_number,
    join_date: new Date(join_date),
    resign_date: resign_date ? new Date(resign_date) : undefined,
    salary,
    bonus: bonus || 0,
    current_location,
    permanent_location,
  });

  const response: ApiResponse = {
    success: true,
    message: "Employee created successfully",
    timestamp: new Date().toISOString(),
  };

  res.status(HttpStatus.CREATED).json(response);
};
