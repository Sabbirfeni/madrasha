import { z } from "zod";
import { UserRole } from "../../../config/constants";

export const createAdminSchema = z.object({
  type: z.nativeEnum(UserRole, {
    errorMap: () => ({ message: "Invalid admin type" }),
  }),
  employee_id: z.string().uuid("Invalid employee ID format"),
  access_boys_section: z.boolean({
    errorMap: () => ({ message: "Access boys section must be boolean" }),
  }),
  access_girls_section: z.boolean({
    errorMap: () => ({ message: "Access girls section must be boolean" }),
  }),
  access_residential_section: z.boolean({
    errorMap: () => ({ message: "Access residential section must be boolean" }),
  }),
});
