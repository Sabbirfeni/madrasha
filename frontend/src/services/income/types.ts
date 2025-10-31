export type Income = {
  _id: string;
  branch: number;
  type: number;
  amount: number;
  income_date: string;
  notes: string;
  admin_id: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateIncomeInput = {
  branch: number;
  type: number;
  amount: number;
  income_date: string;
  notes: string;
};

export type UpdateIncomeInput = CreateIncomeInput;
