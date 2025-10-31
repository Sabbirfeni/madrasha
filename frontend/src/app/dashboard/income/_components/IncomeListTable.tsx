'use client';

import { BRANCH_LABELS } from '@/domain/branches/lib/labels';
import { INCOME_TYPE_LABELS, IncomeType as IncomeTypeEnum } from '@/domain/income';
import { formatDate, getCurrentYear } from '@/lib/date-utils';
import type { Income } from '@/services/income/types';
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

import { AddIncomeModal } from './AddIncomeModal';
import { EditIncomeModal } from './EditIncomeModal';

export type { Income };

interface IncomeListTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  description?: string;
}

export function IncomeListTable<TData, TValue>({
  columns,
  data,
  title = 'Income',
}: IncomeListTableProps<TData, TValue>) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [selectedIncome, setSelectedIncome] = React.useState<Income | null>(null);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  // Search and filter states
  const [noteSearch, setNoteSearch] = React.useState<string>('');
  const [branchFilter, setBranchFilter] = React.useState<number | ''>('');
  const [typeFilter, setTypeFilter] = React.useState<number | ''>('');
  const [monthFilter, setMonthFilter] = React.useState<string>('');
  const [yearFilter, setYearFilter] = React.useState<string>('');

  const handleEditIncome = (income: Income) => {
    setSelectedIncome(income);
    setIsEditModalOpen(true);
  };

  const filteredData = React.useMemo(() => {
    let filtered = data as Income[];

    if (noteSearch) {
      filtered = filtered.filter((income) =>
        income.notes.toLowerCase().includes(noteSearch.toLowerCase()),
      );
    }

    if (branchFilter) {
      filtered = filtered.filter((income) => income.branch === branchFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter((income) => income.type === typeFilter);
    }

    if (monthFilter) {
      filtered = filtered.filter((income) => {
        const incomeDate = new Date(income.income_date);
        const incomeMonth = incomeDate.getMonth() + 1; // getMonth() returns 0-11
        return incomeMonth === Number.parseInt(monthFilter);
      });
    }

    if (yearFilter) {
      filtered = filtered.filter((income) => {
        const incomeDate = new Date(income.income_date);
        return incomeDate.getFullYear() === Number.parseInt(yearFilter);
      });
    }

    return filtered as TData[];
  }, [data, noteSearch, branchFilter, typeFilter, monthFilter, yearFilter]);

  // Calculate total amount from filtered data
  const totalAmount = React.useMemo(() => {
    const filteredIncomes = filteredData as Income[];
    return filteredIncomes.reduce((sum, income) => sum + income.amount, 0);
  }, [filteredData]);

  const updatedColumns = React.useMemo(() => {
    return columns.map((column) => {
      if (column.id === 'actions') {
        return {
          ...column,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cell: ({ row }: { row: any }) => {
            const income = row.original as Income;
            return (
              <Button
                variant="link"
                className="h-auto p-0 text-sm text-primary underline"
                onClick={() => handleEditIncome(income)}
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

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">
          {title} - ৳{totalAmount.toLocaleString()}
        </h2>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              placeholder="Search income..."
              value={noteSearch}
              onChange={(event) => setNoteSearch(event.target.value)}
              className="h-9 w-64"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 px-3 bg-transparent">
                {branchFilter ? BRANCH_LABELS[branchFilter as 1 | 2] : 'Branch'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={!branchFilter}
                onCheckedChange={() => setBranchFilter('')}
              >
                All Branches
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={branchFilter === 1}
                onCheckedChange={() => setBranchFilter(branchFilter === 1 ? '' : 1)}
              >
                Boys
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={branchFilter === 2}
                onCheckedChange={() => setBranchFilter(branchFilter === 2 ? '' : 2)}
              >
                Girls
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 px-3 bg-transparent">
                {typeFilter ? INCOME_TYPE_LABELS[typeFilter as IncomeTypeEnum] : 'Type'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={!typeFilter}
                onCheckedChange={() => setTypeFilter('')}
              >
                All Types
              </DropdownMenuCheckboxItem>
              {Object.entries(INCOME_TYPE_LABELS).map(([value, label]) => {
                const numValue = Number.parseInt(value) as IncomeTypeEnum;
                return (
                  <DropdownMenuCheckboxItem
                    key={value}
                    checked={typeFilter === numValue}
                    onCheckedChange={() => setTypeFilter(typeFilter === numValue ? '' : numValue)}
                  >
                    {label}
                  </DropdownMenuCheckboxItem>
                );
              })}
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
            Add Income
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

      <AddIncomeModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      <EditIncomeModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        income={selectedIncome}
      />
    </div>
  );
}

export const incomeListTableColumns: ColumnDef<Income>[] = [
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as number;
      const variantMap: Record<number, 'default' | 'secondary' | 'outline'> = {
        [IncomeTypeEnum.ADMISSION_FEE]: 'default',
        [IncomeTypeEnum.SESSION_FEE]: 'secondary',
        [IncomeTypeEnum.STUDENTS_MONTHLY_FEE]: 'default',
        [IncomeTypeEnum.CANTEEN]: 'secondary',
        [IncomeTypeEnum.OTHERS]: 'outline',
      };
      const variant = variantMap[type] || 'outline';
      const label = INCOME_TYPE_LABELS[type as IncomeTypeEnum] || 'Unknown';
      return <Badge variant={variant}>{label}</Badge>;
    },
  },
  {
    accessorKey: 'notes',
    header: 'Note',
    cell: ({ row }) => {
      const notes = row.getValue('notes') as string;
      return (
        <div className="max-w-xs truncate" title={notes}>
          {notes}
        </div>
      );
    },
  },

  {
    accessorKey: 'branch',
    header: 'Branch',
    cell: ({ row }) => {
      const branch = row.getValue('branch') as number;
      return <div className="text-sm">{BRANCH_LABELS[branch as 1 | 2]}</div>;
    },
  },
  {
    accessorKey: 'admin_id',
    header: 'Added By',
    cell: ({ row }) => {
      const admin = row.getValue('admin_id') as Income['admin_id'];
      const fullname = admin?.employee_id?.fullname || 'Unknown';
      return <div className="text-sm">{fullname}</div>;
    },
  },
  {
    accessorKey: 'income_date',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.getValue('income_date') as string;
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
