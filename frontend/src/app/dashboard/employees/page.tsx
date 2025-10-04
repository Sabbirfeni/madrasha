import React from 'react';

import { EmployeeListTable, employeeListTableColumns } from './_components/EmployeeListTable';
import { allEmployees } from './employees';

const EmployesPage = () => {
  return (
    <EmployeeListTable columns={employeeListTableColumns} data={allEmployees} title="Employees" />
  );
};

export default EmployesPage;
