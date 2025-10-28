import { type Document } from "mongoose";
import { UserRole } from "../../config/constants";

export type AdminDocument = Document & {
  employee_id: string;
  password: string;
  role: UserRole;
  access_boys_section: boolean;
  access_girls_section: boolean;
  access_residential_section: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateAdminInput = {
  role: UserRole;
  employee_id: string;
  access_boys_section: boolean;
  access_girls_section: boolean;
  access_residential_section: boolean;
};
