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

import {
  type Donation as DonationData,
  type DonationType,
  donationTypeOptions,
} from '../donations';
import { AddDonationModal } from './AddDonationModal';
import { EditDonationModal } from './EditDonationModal';

export type Donation = DonationData;

const badgeVariantByDonationType: Record<
  DonationType,
  React.ComponentProps<typeof Badge>['variant']
> = {
  Sadaqah: 'secondary',
  Zakat: 'outline',
  Membership: 'default',
  Others: 'default',
};

interface DonationListTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  description?: string;
}

export function DonationListTable<TData, TValue>({
  columns,
  data,
  title = 'Donations',
}: DonationListTableProps<TData, TValue>) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [selectedDonation, setSelectedDonation] = React.useState<Donation | null>(null);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  // Search and filter states
  const [nameSearch, setNameSearch] = React.useState<string>('');
  const [typeFilter, setTypeFilter] = React.useState<DonationType | ''>('');
  const [monthFilter, setMonthFilter] = React.useState<string>('');
  const [yearFilter, setYearFilter] = React.useState<string>('');
  const [branchFilter, setBranchFilter] = React.useState<string>('');

  const handleEditDonation = (donation: Donation) => {
    setSelectedDonation(donation);
    setIsEditModalOpen(true);
  };

  const filteredData = React.useMemo(() => {
    let filtered = data as Donation[];

    if (nameSearch) {
      filtered = filtered.filter((donation) =>
        donation.donorName.toLowerCase().includes(nameSearch.toLowerCase()),
      );
    }

    if (typeFilter) {
      filtered = filtered.filter((donation) => donation.type === typeFilter);
    }

    if (branchFilter) {
      filtered = filtered.filter((donation) => donation.branch === branchFilter);
    }

    if (monthFilter) {
      filtered = filtered.filter((donation) => {
        const donationDate = new Date(donation.date);
        const donationMonth = donationDate.getMonth() + 1; // getMonth() returns 0-11
        return donationMonth === Number.parseInt(monthFilter);
      });
    }

    if (yearFilter) {
      filtered = filtered.filter((donation) => {
        const donationDate = new Date(donation.date);
        return donationDate.getFullYear() === Number.parseInt(yearFilter);
      });
    }

    return filtered as TData[];
  }, [data, nameSearch, typeFilter, branchFilter, monthFilter, yearFilter]);

  // Calculate total amount from filtered data
  const totalAmount = React.useMemo(() => {
    const filteredDonations = filteredData as Donation[];
    return filteredDonations.reduce((sum, donation) => sum + donation.amount, 0);
  }, [filteredData]);

  const updatedColumns = React.useMemo(() => {
    return columns.map((column) => {
      if (column.id === 'actions') {
        return {
          ...column,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cell: ({ row }: { row: any }) => {
            const donation = row.original as Donation;
            return (
              <Button
                variant="link"
                className="h-auto p-0 text-sm text-primary underline"
                onClick={() => handleEditDonation(donation)}
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
              placeholder="Search donations..."
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
              {donationTypeOptions.map((donationType) => (
                <DropdownMenuCheckboxItem
                  key={donationType}
                  checked={typeFilter === donationType}
                  onCheckedChange={() =>
                    setTypeFilter(typeFilter === donationType ? '' : donationType)
                  }
                >
                  {donationType}
                </DropdownMenuCheckboxItem>
              ))}
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
            Add Donation
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

      <AddDonationModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      <EditDonationModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        donation={selectedDonation}
      />
    </div>
  );
}

export const donationListTableColumns: ColumnDef<Donation>[] = [
  {
    accessorKey: 'donorName',
    header: 'Name',
    cell: ({ row }) => <div className="font-medium">{row.getValue('donorName')}</div>,
  },
  {
    accessorKey: 'branch',
    header: 'Branch',
    cell: ({ row }) => <div className="text-sm">{row.getValue('branch')}</div>,
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone',
    cell: ({ row }) => <div className="text-sm">{row.getValue('phoneNumber')}</div>,
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      const variant = badgeVariantByDonationType[type as DonationType] ?? 'outline';
      return <Badge variant={variant}>{type}</Badge>;
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
