export type OverviewStats = {
  totalIncome: number;
  totalDonations: number;
  totalExpense: number;
  currentBalance: number;
};

export type MonthlyIncomeExpense = {
  month: string;
  income: number;
  expense: number;
};

export type MonthlyDonations = {
  month: string;
  sadaqah: number;
  zakat: number;
  membership: number;
  others: number;
};
