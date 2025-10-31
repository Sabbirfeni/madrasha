import { type Document, type Types } from "mongoose";

export type ExpenseDocument = Document & {
  admin_id: Types.ObjectId;
  branch: number;
  type: number;
  amount: number;
  expense_date: Date;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ExpenseListItem = {
  _id: string;
  branch: number;
  type: number;
  amount: number;
  expense_date: Date;
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

export type CreateExpenseInput = {
  branch: number;
  type: number;
  amount: number;
  expense_date: string;
  notes: string;
};

export type UpdateExpenseInput = CreateExpenseInput;
