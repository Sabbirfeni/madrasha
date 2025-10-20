'use client';

import { IncomeListTable, incomeListTableColumns } from './_components/IncomeListTable';
import { allIncomes } from './income';

export default function IncomePage() {
  return <IncomeListTable columns={incomeListTableColumns} data={allIncomes} title="Income" />;
}
