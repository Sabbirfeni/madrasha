import { getEmployees } from '@/services/employees';

import { EmployeeListTable, employeeListTableColumns } from './_components/EmployeeListTable';

const EmployesPage = async () => {
  const response = await getEmployees({
    cache: true,
    tags: ['employees'],
  });

  if (!response) return;

  return (
    <EmployeeListTable columns={employeeListTableColumns} data={response.docs} title="Employees" />
  );
};

export default EmployesPage;
