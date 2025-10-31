export const EXPENSE_TYPE_MAP = {
  1: 'Salary',
  2: 'Hostel',
  3: 'Electricity Bill',
  4: 'Mobile & Internet Bill',
  5: 'Office',
  6: 'Stationery',
  7: 'Utilities',
  8: 'Fare',
  9: 'Maintenance',
  10: 'Construction',
} as const;

export const EXPENSE_TYPE_REVERSE_MAP = {
  Salary: 1,
  Hostel: 2,
  'Electricity Bill': 3,
  'Mobile & Internet Bill': 4,
  Office: 5,
  Stationery: 6,
  Utilities: 7,
  Fare: 8,
  Maintenance: 9,
  Construction: 10,
} as const;

export type ExpenseTypeLabel = (typeof EXPENSE_TYPE_MAP)[keyof typeof EXPENSE_TYPE_MAP];
export type ExpenseTypeValue = keyof typeof EXPENSE_TYPE_MAP;
