import { type Document } from "mongoose";
import { UserRole } from "../../config/constants";

export type AdminDocument = Document & {
  id: string;
  employee_id: string;
  password: string;
  type: UserRole;
  access_boys_section: boolean;
  access_girls_section: boolean;
  access_residential_section: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateAdminInput = {
  type: UserRole;
  employee_id: string;
  access_boys_section: boolean;
  access_girls_section: boolean;
  access_residential_section: boolean;
};
