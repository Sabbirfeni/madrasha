import { Router } from "express";

import {
  getExpenses,
  createExpense,
  updateExpense,
} from "../controllers/expense.controller";
import { validate } from "../middlewares/validation/validate";
import {
  createExpenseSchema,
  updateExpenseSchema,
} from "../middlewares/validation/schemas/expense.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getExpenses));

router.post(
  "/create-expense",
  validate(createExpenseSchema),
  asyncHandler(createExpense)
);

router.put("/:id", validate(updateExpenseSchema), asyncHandler(updateExpense));

export default router;
