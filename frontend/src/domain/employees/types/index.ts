import { Designation, EmployeeType } from '@/domain/employees/enums';

export type Employee = {
  _id: string;
  fullname: string;
  employment_type: EmployeeType;
  designation?: Designation;
  branch: string;
  join_date: string;
  phone_number: string;
};
