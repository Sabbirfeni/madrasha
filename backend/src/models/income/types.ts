import { type Document, type Types } from "mongoose";

export type IncomeDocument = Document & {
  admin_id: Types.ObjectId;
  branch: number;
  type: number;
  amount: number;
  income_date: Date;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IncomeListItem = {
  _id: string;
  branch: number;
  type: number;
  amount: number;
  income_date: Date;
  notes: string;
  admin_id: {
    _id: string;
    employee_id: {
      _id: string;
      fullname: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
};

export type CreateIncomeInput = {
  branch: number;
  type: number;
  amount: number;
  income_date: string;
  notes: string;
};

export type UpdateIncomeInput = CreateIncomeInput;
