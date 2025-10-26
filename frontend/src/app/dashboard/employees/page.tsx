import { getEmployees } from '@/services/employees';

import { EmployeeListTable, employeeListTableColumns } from './_components/EmployeeListTable';

const EmployesPage = async () => {
  const employees = await getEmployees({
    cache: true,
    life: 'minutes',
    tags: ['employees'],
  });

  return (
    <EmployeeListTable columns={employeeListTableColumns} data={employees} title="Employees" />
  );
};

export default EmployesPage;
