import { type Document } from "mongoose";

export type EmployeeDocument = Document & {
  id: string;
  branch: string;
  role: string;
  designation: string;
  fullname: string;
  profile_image?: string;
  nid_no: string;
  gender: string;
  phone_number: string;
  join_date: Date;
  resign_date?: Date;
  salary: number;
  bonus: number;
  current_location: string;
  permanent_location: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateEmployeeInput = {
  branch: string;
  role: string;
  designation: string;
  fullname: string;
  profile_image?: string;
  nid_no: string;
  gender: string;
  phone_number: string;
  join_date: string;
  resign_date?: string;
  salary: number;
  bonus?: number;
  current_location: string;
  permanent_location: string;
};
