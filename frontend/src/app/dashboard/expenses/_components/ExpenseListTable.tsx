'use client';

import { formatDate, getCurrentYear } from '@/lib/date-utils';
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Plus } from 'lucide-react';

import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { AddExpenseModal } from './AddExpenseModal';
import { EditExpenseModal } from './EditExpenseModal';

export type Expense = {
  id: string;
  branch: 'Boys' | 'Girls';
  type: 'Salary' | 'Food' | 'Utility';
  note: string;
  addedBy: string;
  date: string;
  amount: number;
};

interface ExpenseListTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  description?: string;
}

export function ExpenseListTable<TData, TValue>({
  columns,
  data,
  title = 'Expenses',
}: ExpenseListTableProps<TData, TValue>) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [selectedExpense, setSelectedExpense] = React.useState<Expense | null>(null);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  // Search and filter states
  const [noteSearch, setNoteSearch] = React.useState<string>('');
  const [branchFilter, setBranchFilter] = React.useState<string>('');
  const [typeFilter, setTypeFilter] = React.useState<string>('');
  const [monthFilter, setMonthFilter] = React.useState<string>('');
  const [yearFilter, setYearFilter] = React.useState<string>('');

  const handleEditExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsEditModalOpen(true);
  };

  const filteredData = React.useMemo(() => {
    let filtered = data as Expense[];

    if (noteSearch) {
      filtered = filtered.filter((expense) =>
        expense.note.toLowerCase().includes(noteSearch.toLowerCase()),
      );
    }

    if (branchFilter) {
      filtered = filtered.filter((expense) => expense.branch === branchFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter((expense) => expense.type === typeFilter);
    }

    if (monthFilter) {
      filtered = filtered.filter((expense) => {
        const expenseDate = new Date(expense.date);
        const expenseMonth = expenseDate.getMonth() + 1; // getMonth() returns 0-11
        return expenseMonth === Number.parseInt(monthFilter);
      });
    }

    if (yearFilter) {
      filtered = filtered.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getFullYear() === Number.parseInt(yearFilter);
      });
    }

    return filtered as TData[];
  }, [data, noteSearch, branchFilter, typeFilter, monthFilter, yearFilter]);

  // Calculate total amount from filtered data
  const totalAmount = React.useMemo(() => {
    const filteredExpenses = filteredData as Expense[];
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [filteredData]);

  const updatedColumns = React.useMemo(() => {
    return columns.map((column) => {
      if (column.id === 'actions') {
        return {
          ...column,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cell: ({ row }: { row: any }) => {
            const expense = row.original as Expense;
            return (
              <Button
                variant="link"
                className="h-auto p-0 text-sm text-primary underline"
                onClick={() => handleEditExpense(expense)}
              >
                Edit
              </Button>
            );
          },
        };
      }
      return column;
    });
  }, [columns]);

  const table = useReactTable({
    data: filteredData,
    columns: updatedColumns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 15,
      },
    },
    state: {
      columnFilters,
    },
  });

  // Generate month options
  const monthOptions = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  // Generate year options (current year and previous 5 years)
  const currentYear = getCurrentYear();
  const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - i);

  // Get unique branches from data
  const branchOptions = React.useMemo(() => {
    const branches = Array.from(new Set((data as Expense[]).map((expense) => expense.branch)));
    return branches.sort();
  }, [data]);

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">
          {title} - ৳{totalAmount.toLocaleString()}
        </h2>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              placeholder="Search expenses..."
              value={noteSearch}
              onChange={(event) => setNoteSearch(event.target.value)}
              className="h-9 w-64"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 px-3 bg-transparent">
                {branchFilter || 'Branch'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={!branchFilter}
                onCheckedChange={() => setBranchFilter('')}
              >
                All Branches
              </DropdownMenuCheckboxItem>
              {branchOptions.map((branch) => (
                <DropdownMenuCheckboxItem
                  key={branch}
                  checked={branchFilter === branch}
                  onCheckedChange={() => setBranchFilter(branchFilter === branch ? '' : branch)}
                >
                  {branch}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 px-3 bg-transparent">
                {typeFilter || 'Type'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={!typeFilter}
                onCheckedChange={() => setTypeFilter('')}
              >
                All Types
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={typeFilter === 'Salary'}
                onCheckedChange={() => setTypeFilter(typeFilter === 'Salary' ? '' : 'Salary')}
              >
                Salary
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={typeFilter === 'Food'}
                onCheckedChange={() => setTypeFilter(typeFilter === 'Food' ? '' : 'Food')}
              >
                Food
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={typeFilter === 'Utility'}
                onCheckedChange={() => setTypeFilter(typeFilter === 'Utility' ? '' : 'Utility')}
              >
                Utility
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 px-3 bg-transparent">
                {monthFilter ? monthOptions.find((m) => m.value === monthFilter)?.label : 'Month'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={!monthFilter}
                onCheckedChange={() => setMonthFilter('')}
              >
                All Months
              </DropdownMenuCheckboxItem>
              {monthOptions.map((month) => (
                <DropdownMenuCheckboxItem
                  key={month.value}
                  checked={monthFilter === month.value}
                  onCheckedChange={() =>
                    setMonthFilter(monthFilter === month.value ? '' : month.value)
                  }
                >
                  {month.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 px-3 bg-transparent">
                {yearFilter || 'Year'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={!yearFilter}
                onCheckedChange={() => setYearFilter('')}
              >
                All Years
              </DropdownMenuCheckboxItem>
              {yearOptions.map((year) => (
                <DropdownMenuCheckboxItem
                  key={year}
                  checked={yearFilter === year.toString()}
                  onCheckedChange={() =>
                    setYearFilter(yearFilter === year.toString() ? '' : year.toString())
                  }
                >
                  {year}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="h-9 px-3" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Expense
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b bg-muted/50">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="h-12 font-medium">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-b transition-colors hover:bg-muted/50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {table.getFilteredRowModel().rows.length} result(s) - Total: ৳
          {totalAmount.toLocaleString()}
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-8"
          >
            Next
          </Button>
        </div>
      </div>

      <AddExpenseModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      <EditExpenseModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        expense={selectedExpense}
      />
    </div>
  );
}

export const expenseListTableColumns: ColumnDef<Expense>[] = [
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      const variant = type === 'Salary' ? 'default' : type === 'Food' ? 'secondary' : 'outline';
      return <Badge variant={variant}>{type}</Badge>;
    },
  },
  {
    accessorKey: 'note',
    header: 'Note',
    cell: ({ row }) => {
      const note = row.getValue('note') as string;
      return (
        <div className="max-w-xs truncate" title={note}>
          {note}
        </div>
      );
    },
  },
  {
    accessorKey: 'addedBy',
    header: 'Added By',
    cell: ({ row }) => <div className="text-sm">{row.getValue('addedBy')}</div>,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.getValue('date') as string;
      return <div className="text-sm">{formatDate(date)}</div>;
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number;
      return <div className="font-medium">৳{amount.toLocaleString()}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    header: 'Edit',
    cell: () => null,
  },
];
