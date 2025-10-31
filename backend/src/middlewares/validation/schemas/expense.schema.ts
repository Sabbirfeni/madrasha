import { z } from "zod";

const dateStringSchema = z
  .string()
  .min(1, "Expense date is required")
  .refine((value) => {
    const parsed = new Date(value);
    return !Number.isNaN(parsed.getTime());
  }, "Invalid date format");

export const createExpenseSchema = z.object({
  branch: z.number().int().min(1, "Branch is required"),
  type: z
    .number()
    .int()
    .min(1, "Expense type is required")
    .max(10, "Invalid expense type"),
  amount: z.number().int().min(0, "Amount must be zero or greater"),
  expense_date: dateStringSchema,
  notes: z
    .string()
    .min(1, "Notes are required")
    .max(255, "Notes must not exceed 255 characters"),
});

export const updateExpenseSchema = createExpenseSchema;
