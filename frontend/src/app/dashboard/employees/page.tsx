import { authOptions } from '@/lib/auth';
import { getEmployees } from '@/services/employees';
import { getServerSession } from 'next-auth';

import { EmployeeListTable, employeeListTableColumns } from './_components/EmployeeListTable';

const EmployesPage = async () => {
  const session = await getServerSession(authOptions);
  const response = await getEmployees(
    { accessToken: (session as typeof session & { accessToken?: string })?.accessToken },
    {
      cache: true,
      tags: ['employees'],
    },
  );

  if (!response) return;

  return (
    <EmployeeListTable columns={employeeListTableColumns} data={response.docs} title="Employees" />
  );
};

export default EmployesPage;
