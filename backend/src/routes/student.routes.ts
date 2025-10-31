import { Router } from "express";

import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
} from "../controllers/student.controller";
import { validate } from "../middlewares/validation/validate";
import { createStudentSchema } from "../middlewares/validation/schemas/student.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getStudents));

router.get("/:id", asyncHandler(getStudentById));

router.post(
  "/create-student",
  validate(createStudentSchema),
  asyncHandler(createStudent)
);

router.put("/:id", validate(createStudentSchema), asyncHandler(updateStudent));

export default router;
