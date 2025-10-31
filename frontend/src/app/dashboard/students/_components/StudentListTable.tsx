'use client';

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

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

export type Student = {
  id: string;
  student_image?: string;
  name: string;
  branch: 'Boys' | 'Girls';
  is_residential: boolean;
  section: 'Najera' | 'Hifz' | 'Nurani' | 'Kitab';
  class:
    | 'Shishu'
    | 'One'
    | 'Two'
    | 'Three'
    | 'Four'
    | 'Five'
    | 'Six'
    | 'Seven'
    | 'Eight'
    | 'Nine'
    | 'Ten';
  enrollment_years: number[];
  guardian: {
    name: string;
    phone: string;
  };
};

interface StudentListTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  description?: string;
}

export function StudentListTable<TData, TValue>({
  columns,
  data,
  title = 'Students',
}: StudentListTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const [nameSearch, setNameSearch] = React.useState<string>('');
  const [branchFilter, setBranchFilter] = React.useState<string>('');
  const [sectionFilter, setSectionFilter] = React.useState<string>('');
  const [classFilter, setClassFilter] = React.useState<string>('');
  const [yearFilter, setYearFilter] = React.useState<string>('');

  const filteredData = React.useMemo(() => {
    let filtered = data as Student[];

    if (nameSearch) {
      filtered = filtered.filter((student) =>
        student.name.toLowerCase().includes(nameSearch.toLowerCase()),
      );
    }

    if (branchFilter) {
      filtered = filtered.filter((student) => student.branch === branchFilter);
    }
    if (sectionFilter) {
      filtered = filtered.filter((student) => student.section === sectionFilter);
    }
    if (classFilter) {
      filtered = filtered.filter((student) => student.class === classFilter);
    }
    if (yearFilter) {
      filtered = filtered.filter((student) =>
        student.enrollment_years.includes(Number.parseInt(yearFilter)),
      );
    }

    return filtered as TData[];
  }, [data, nameSearch, branchFilter, sectionFilter, classFilter, yearFilter]);

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
              placeholder="Search students..."
              value={nameSearch}
              onChange={(event) => setNameSearch(event.target.value)}
              className="h-9 w-64"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 px-3 bg-transparent">
                {branchFilter || 'Branches'}
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
                checked={branchFilter === 'Boys'}
                onCheckedChange={() => setBranchFilter(branchFilter === 'Boys' ? '' : 'Boys')}
              >
                Boys
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={branchFilter === 'Girls'}
                onCheckedChange={() => setBranchFilter(branchFilter === 'Girls' ? '' : 'Girls')}
              >
                Girls
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 px-3 bg-transparent">
                {sectionFilter || 'Sections'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={!sectionFilter}
                onCheckedChange={() => setSectionFilter('')}
              >
                All Sections
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sectionFilter === 'Najera'}
                onCheckedChange={() => setSectionFilter(sectionFilter === 'Najera' ? '' : 'Najera')}
              >
                Najera
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sectionFilter === 'Hifz'}
                onCheckedChange={() => setSectionFilter(sectionFilter === 'Hifz' ? '' : 'Hifz')}
              >
                Hifz
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sectionFilter === 'Nurani'}
                onCheckedChange={() => setSectionFilter(sectionFilter === 'Nurani' ? '' : 'Nurani')}
              >
                Nurani
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sectionFilter === 'Kitab'}
                onCheckedChange={() => setSectionFilter(sectionFilter === 'Kitab' ? '' : 'Kitab')}
              >
                Kitab
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 px-3 bg-transparent">
                {classFilter || 'Classes'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={!classFilter}
                onCheckedChange={() => setClassFilter('')}
              >
                All Classes
              </DropdownMenuCheckboxItem>
              {[
                'Shishu',
                'One',
                'Two',
                'Three',
                'Four',
                'Five',
                'Six',
                'Seven',
                'Eight',
                'Nine',
                'Ten',
              ].map((cls) => (
                <DropdownMenuCheckboxItem
                  key={cls}
                  checked={classFilter === cls}
                  onCheckedChange={() => setClassFilter(classFilter === cls ? '' : cls)}
                >
                  {cls}
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
              {['2025', '2024', '2023', '2022'].map((year) => (
                <DropdownMenuCheckboxItem
                  key={year}
                  checked={yearFilter === year}
                  onCheckedChange={() => setYearFilter(yearFilter === year ? '' : year)}
                >
                  {year}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="h-9 px-3" asChild>
            <Link href="/dashboard/add-student">
              <Plus className="h-4 w-4" />
              Add Student
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

export const studentListTableColumns: ColumnDef<Student>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const student = row.original;
      const initials = student.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={student.student_image || '/placeholder.svg'} alt={student.name} />
            <AvatarFallback className="text-xs font-medium">{initials}</AvatarFallback>
          </Avatar>
          <div className="font-medium">{student.name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'section',
    header: 'Section',
    cell: ({ row }) => <div className="text-sm">{row.getValue('section')}</div>,
  },
  {
    accessorKey: 'class',
    header: 'Class',
    cell: ({ row }) => <div className="text-sm">{row.getValue('class')}</div>,
  },
  {
    accessorKey: 'guardian',
    header: 'Guardian Name',
    cell: ({ row }) => {
      const guardian = row.getValue('guardian') as Student['guardian'];
      return <div className="font-medium">{guardian.name}</div>;
    },
  },
  {
    accessorKey: 'guardian.phone',
    header: 'Phone',
    cell: ({ row }) => {
      const guardian = row.getValue('guardian') as Student['guardian'];
      return <div className="font-mono text-sm">{guardian.phone}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    header: 'Action',
    cell: ({ row }) => {
      const student = row.original;
      return (
        <Link href={`/dashboard/students/${student.id}`}>
          <Button variant="link" className="h-auto p-0 text-sm text-primary underline">
            Details
          </Button>
        </Link>
      );
    },
  },
];
