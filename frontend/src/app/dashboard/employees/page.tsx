import { getEmployees } from '@/services/employees';

import { EmployeeListTable, employeeListTableColumns } from './_components/EmployeeListTable';

const EmployesPage = async () => {
  const response = await getEmployees({
    cache: true,
    tags: ['employees'],
  });
  console.log('server response', response);
  if (!response) return;

  return (
    <EmployeeListTable columns={employeeListTableColumns} data={response.docs} title="Employees" />
  );
};

export default EmployesPage;
