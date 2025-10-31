'use client';

import { Branch, toBranchLabel } from '@/domain/branches';
import {
  type Employee,
  EmployeeType,
  formatDesignation,
  formatEmployeeType,
} from '@/domain/employees';
import { formatDate } from '@/lib/date-utils';
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

import Link from 'next/link';

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

interface EmployeeListTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  description?: string;
}

export function EmployeeListTable<TData, TValue>({
  columns,
  data,
  title = 'Employees',
}: EmployeeListTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const [nameSearch, setNameSearch] = React.useState<string>('');
  const [branchFilter, setBranchFilter] = React.useState<number | ''>('');
  const [employmentTypeFilter, setEmploymentTypeFilter] = React.useState<number | ''>('');

  const filteredData = React.useMemo(() => {
    let filtered = data as Employee[];

    if (nameSearch) {
      filtered = filtered.filter((employee) =>
        employee.fullname.toLowerCase().includes(nameSearch.toLowerCase()),
      );
    }

    if (branchFilter !== '') {
      filtered = filtered.filter((employee) => employee.branch === branchFilter);
    }

    if (employmentTypeFilter !== '') {
      filtered = filtered.filter(
        (employee) => (employee as unknown as Employee).employment_type === employmentTypeFilter,
      );
    }

    return filtered as TData[];
  }, [data, nameSearch, branchFilter, employmentTypeFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
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

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">
          {title} ({filteredData.length})
        </h2>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              placeholder="Search employees..."
              value={nameSearch}
              onChange={(event) => setNameSearch(event.target.value)}
              className="h-9 w-64"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 px-3 bg-transparent">
                {branchFilter === '' ? 'Branch' : toBranchLabel(branchFilter)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={branchFilter === ''}
                onCheckedChange={() => setBranchFilter('')}
              >
                All Branches
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={branchFilter === Branch.BOYS}
                onCheckedChange={() =>
                  setBranchFilter(branchFilter === Branch.BOYS ? '' : Branch.BOYS)
                }
              >
                Boys
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={branchFilter === Branch.GIRLS}
                onCheckedChange={() =>
                  setBranchFilter(branchFilter === Branch.GIRLS ? '' : Branch.GIRLS)
                }
              >
                Girls
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 px-3 bg-transparent">
                {employmentTypeFilter === ''
                  ? 'Employment Type'
                  : formatEmployeeType(employmentTypeFilter)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={employmentTypeFilter === ''}
                onCheckedChange={() => setEmploymentTypeFilter('')}
              >
                All Types
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={employmentTypeFilter === EmployeeType.ADMINISTRATION}
                onCheckedChange={() =>
                  setEmploymentTypeFilter(
                    employmentTypeFilter === EmployeeType.ADMINISTRATION
                      ? ''
                      : EmployeeType.ADMINISTRATION,
                  )
                }
              >
                Administration
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={employmentTypeFilter === EmployeeType.TEACHER}
                onCheckedChange={() =>
                  setEmploymentTypeFilter(
                    employmentTypeFilter === EmployeeType.TEACHER ? '' : EmployeeType.TEACHER,
                  )
                }
              >
                Teacher
              </DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem
                checked={employmentTypeFilter === EmployeeType.MEDIA_IT}
                onCheckedChange={() =>
                  setEmploymentTypeFilter(
                    employmentTypeFilter === EmployeeType.MEDIA_IT ? '' : EmployeeType.MEDIA_IT,
                  )
                }
              >
                Media & IT
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={employmentTypeFilter === EmployeeType.STAFF}
                onCheckedChange={() =>
                  setEmploymentTypeFilter(
                    employmentTypeFilter === EmployeeType.STAFF ? '' : EmployeeType.STAFF,
                  )
                }
              >
                Staff
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="h-9 px-3" asChild>
            <Link href="/dashboard/add-employee">
              <Plus className="h-4 w-4" />
              Add Employee
            </Link>
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
          Showing {table.getFilteredRowModel().rows.length} result(s).
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
    </div>
  );
}

export const employeeListTableColumns: ColumnDef<Employee, unknown>[] = [
  {
    accessorKey: 'fullname',
    header: 'Name',
    cell: ({ row }) => <div className="font-medium">{row.getValue('fullname')}</div>,
  },
  {
    accessorKey: 'employment_type',
    header: 'Employment Type',
    cell: ({ row }) => {
      const value = row.getValue('employment_type') as number;
      return <div className="text-sm">{formatEmployeeType(value)}</div>;
    },
  },
  {
    accessorKey: 'designation',
    header: 'Designation',
    cell: ({ row }) => {
      const value = (row.getValue('designation') as number | null) ?? null;
      return <div className="text-sm">{formatDesignation(value)}</div>;
    },
  },
  {
    accessorKey: 'join_date',
    header: 'Join Date',
    cell: ({ row }) => {
      const date = row.getValue('join_date') as string;
      return <div className="text-sm">{formatDate(date)}</div>;
    },
  },
  {
    accessorKey: 'phone_number',
    header: 'Phone',
    cell: ({ row }) => <div className="font-mono text-sm">{row.getValue('phone_number')}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    header: '',
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <Link href={`/dashboard/employees/${employee._id}`}>
          <Button variant="link" className="h-auto p-0 text-sm text-primary underline">
            Details
          </Button>
        </Link>
      );
    },
  },
];
