import { z } from "zod";

export const loginSchema = z.object({
  phone_number: z
    .string()
    .regex(/^01\d{9}$/, "Phone number must be 11 digits starting with 01"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
