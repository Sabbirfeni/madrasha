'use client';

import { ExpenseListTable, expenseListTableColumns } from './_components/ExpenseListTable';
import { allExpenses } from './expenses';

export default function ExpensesPage() {
  return <ExpenseListTable columns={expenseListTableColumns} data={allExpenses} title="Expenses" />;
}
