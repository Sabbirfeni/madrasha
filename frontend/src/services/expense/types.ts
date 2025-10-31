export type Expense = {
  _id: string;
  branch: number;
  type: number;
  amount: number;
  expense_date: string;
  notes: string;
  admin_id: {
    _id: string;
    employee_id: {
      _id: string;
      fullname: string;
    };
  };
  createdAt: string;
  updatedAt: string;
};

export type CreateExpenseInput = {
  branch: number;
  type: number;
  amount: number;
  expense_date: string;
  notes: string;
};

export type UpdateExpenseInput = CreateExpenseInput;
