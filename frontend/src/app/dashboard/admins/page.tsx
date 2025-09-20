'use client';

import { AdminListTable, adminListTableColumns } from './_components/AdminListTable';
import admins from './admins';

export default function AdminsListPage() {
  return (
    <AdminListTable
      columns={adminListTableColumns}
      data={admins || []}
      title={`Admins (${admins?.length || 0})`}
      description="Manage your admin users and their permissions"
    />
  );
}
