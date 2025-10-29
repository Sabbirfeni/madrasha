import { Designation, EmployeeType } from '@/domain/employees/enums';
import { DESIGNATION_LABELS, EMPLOYEE_TYPE_LABELS } from '@/domain/employees/lib/labels';

export function formatEmployeeType(value: number): string {
  return EMPLOYEE_TYPE_LABELS[value as EmployeeType] ?? 'Unknown';
}

export function formatDesignation(value?: number | null): string {
  if (value == null) return '';
  return DESIGNATION_LABELS[value as Designation] ?? 'Unknown';
}
