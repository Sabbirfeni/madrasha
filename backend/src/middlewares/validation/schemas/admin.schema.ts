import { z } from "zod";

export const createAdminSchema = z.object({
  role: z.number().int().positive("Role must be a valid positive number"),
  employee_id: z
    .string()
    .regex(/^[0-9a-f]{24}$/i, "Invalid employee ID format"),
  access_boys_section: z.boolean({
    errorMap: () => ({ message: "Access boys section must be boolean" }),
  }),
  access_girls_section: z.boolean({
    errorMap: () => ({ message: "Access girls section must be boolean" }),
  }),
});

export const updateAdminSchema = z.object({
  access_boys_section: z.boolean({
    errorMap: () => ({ message: "Access boys section must be boolean" }),
  }),
  access_girls_section: z.boolean({
    errorMap: () => ({ message: "Access girls section must be boolean" }),
  }),
});
