import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middlewares/validation/validate";
import { createEmployeeSchema } from "../middlewares/validation/schemas/employee.schema";
import {
  createEmployee,
  getEmployees,
} from "../controllers/employee.controller";

const router = Router();

router.get("/", asyncHandler(getEmployees));

router.post(
  "/add-employee",
  validate(createEmployeeSchema),
  asyncHandler(createEmployee)
);

export default router;
