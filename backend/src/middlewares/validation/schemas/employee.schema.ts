import { z } from "zod";

export const createEmployeeSchema = z.object({
  branch: z.number().int().positive("Branch must be a positive number"),
  employment_type: z.number().int().positive("Role must be a positive number"),
  designation: z
    .number()
    .int()
    .positive("Designation must be a positive number"),
  fullname: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name must not exceed 100 characters"),
  profile_image: z
    .string()
    .max(255, "Profile image URL must not exceed 255 characters")
    .optional(),
  nid_no: z.string().regex(/^\d{10}$/, "NID number must be exactly 10 digits"),
  gender: z
    .string()
    .min(1, "Gender is required")
    .max(20, "Gender must not exceed 20 characters"),
  phone_number: z
    .string()
    .regex(/^01\d{9}$/, "Phone number must be 11 digits starting with 01"),
  join_date: z.string().datetime("Invalid join date format"),
  resign_date: z.string().datetime("Invalid resign date format").optional(),
  salary: z
    .number()
    .min(0, "Bonus must be non-negative")
    .max(9999999999, "Salary must not exceed 10 digits"),
  bonus: z
    .number()
    .min(0, "Bonus must be non-negative")
    .max(9999999999, "Bonus must not exceed 10 digits")
    .optional(),
  current_location: z
    .string()
    .min(1, "Current location is required")
    .max(250, "Current location must not exceed 250 characters"),
  permanent_location: z
    .string()
    .min(1, "Permanent location is required")
    .max(250, "Permanent location must not exceed 250 characters"),
});
