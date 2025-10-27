'use client';

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MoreHorizontal, Plus } from 'lucide-react';

import * as React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

import { AddAdminModal } from './AddAdminModal';
import { DeleteAdminModal } from './DeleteAdminModal';
import { EditAdminModal } from './EditAdminModal';

export type Admin = {
  id: string;
  name: string;
  type: string;
  phone: string;
  adminSince: string;
  avatar?: string;
};

interface AdminListTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  description?: string;
}

export function AdminListTable<TData, TValue>({
  columns,
  data,
  title = 'Data Table',
}: AdminListTableProps<TData, TValue>) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedAdmin, setSelectedAdmin] = React.useState<Admin | null>(null);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const handleEditAdmin = (admin: Admin) => {
    setSelectedAdmin(admin);
    setIsEditModalOpen(true);
  };

  const handleDeleteAdmin = (admin: Admin) => {
    setSelectedAdmin(admin);
    setIsDeleteModalOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDeleteConfirm = (admin: Admin) => {
    setIsDeleteModalOpen(false);
    setSelectedAdmin(null);
  };

  const updatedColumns = React.useMemo(() => {
    return columns.map((column) => {
      if (column.id === 'actions') {
        return {
          ...column,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cell: ({ row }: { row: any }) => {
            const admin = row.original as Admin;
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleEditAdmin(admin)}>
                    Edit admin
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => handleDeleteAdmin(admin)}
                  >
                    Delete admin
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        };
      }
      return column;
    });
  }, [columns]);

  const table = useReactTable({
    data,
    columns: updatedColumns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
        {/* Title on the left */}
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>

        {/* Search and filters with consistent sizing */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              placeholder="Search admins..."
              value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
              className="h-9 w-64"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 px-3 bg-transparent">
                Type
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={!table.getColumn('type')?.getFilterValue()}
                onCheckedChange={() => table.getColumn('type')?.setFilterValue('')}
              >
                All Types
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={table.getColumn('type')?.getFilterValue() === 'Super Admin'}
                onCheckedChange={() =>
                  table
                    .getColumn('type')
                    ?.setFilterValue(
                      table.getColumn('type')?.getFilterValue() === 'Super Admin'
                        ? ''
                        : 'Super Admin',
                    )
                }
              >
                Super Admin
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={table.getColumn('type')?.getFilterValue() === 'Admin'}
                onCheckedChange={() =>
                  table
                    .getColumn('type')
                    ?.setFilterValue(
                      table.getColumn('type')?.getFilterValue() === 'Admin' ? '' : 'Admin',
                    )
                }
              >
                Admin
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="h-9 px-3" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Admin
          </Button>

          <AddAdminModal open={isModalOpen} onOpenChange={setIsModalOpen} />
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

      <EditAdminModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        admin={selectedAdmin}
      />
      <DeleteAdminModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        admin={selectedAdmin}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

export const adminListTableColumns: ColumnDef<Admin>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const admin = row.original;
      const initials = admin.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={admin.avatar || '/placeholder.svg'} alt={admin.name} />
            <AvatarFallback className="text-xs font-medium">{initials}</AvatarFallback>
          </Avatar>
          <div className="font-medium">{admin.name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    filterFn: (row, columnId, filterValue) => {
      return row.getValue(columnId) === filterValue;
    },
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      return <Badge variant={type === 'Super Admin' ? 'default' : 'secondary'}>{type}</Badge>;
    },
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => <div className="font-mono text-sm">{row.getValue('phone')}</div>,
  },
  {
    accessorKey: 'adminSince',
    header: 'Admin Since',
    cell: ({ row }) => <div className="text-sm">{row.getValue('adminSince')}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    // Cell will be dynamically updated in the component
    cell: () => null,
  },
];
