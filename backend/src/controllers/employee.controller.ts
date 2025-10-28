import { type Request, type Response } from "express";
import { HttpStatus, PAGINATION_DEFAULTS } from "../config/constants";
import { ApiResponse, PaginationResult } from "../types/common";
import { AppError } from "../utils/AppError";
import { Employee } from "../models/employee/employee.model";
import type {
  CreateEmployeeInput,
  EmployeeListItem,
} from "../models/employee/types";

export const createEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    branch,
    employment_type,
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
    employment_type,
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

export const getEmployees = async (
  req: Request,
  res: Response
): Promise<void> => {
  const page = Math.max(1, Number(req.query.page) || PAGINATION_DEFAULTS.PAGE);
  const limit = Math.min(
    Number(req.query.limit) || 15,
    PAGINATION_DEFAULTS.MAX_LIMIT
  );

  const skip = (page - 1) * limit;

  const [employees, total] = await Promise.all([
    Employee.find()
      .select("_id fullname employment_type branch join_date phone_number")
      .limit(limit)
      .skip(skip)
      .lean(),
    Employee.countDocuments(),
  ]);

  const pages = Math.ceil(total / limit);

  const paginationResult: PaginationResult<EmployeeListItem> = {
    docs: employees as unknown as EmployeeListItem[],
    total,
    page,
    pages,
    limit,
    hasNext: page < pages,
    hasPrev: page > 1,
  };

  const response: ApiResponse<PaginationResult<EmployeeListItem>> = {
    success: true,
    message: "Employees retrieved successfully",
    data: paginationResult,
    timestamp: new Date().toISOString(),
  };

  res.status(HttpStatus.OK).json(response);
};
