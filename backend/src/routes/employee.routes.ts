import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middlewares/validation/validate";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from "../middlewares/validation/schemas/employee.schema";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
} from "../controllers/employee.controller";

const router = Router();

router.get("/", asyncHandler(getEmployees));

router.get("/:id", asyncHandler(getEmployeeById));

router.post(
  "/add-employee",
  validate(createEmployeeSchema),
  asyncHandler(createEmployee)
);

router.patch(
  "/:id",
  validate(updateEmployeeSchema),
  asyncHandler(updateEmployee)
);

export default router;
