import { IncomeType } from '@/domain/income/enums';

type Option<TValue extends string | number> = {
  value: TValue;
  label: string;
};

export const INCOME_TYPE_LABELS: Record<IncomeType, string> = {
  [IncomeType.ADMISSION_FEE]: 'Admission Fee',
  [IncomeType.SESSION_FEE]: 'Session Fee',
  [IncomeType.STUDENTS_MONTHLY_FEE]: "Students' Monthly Fee",
  [IncomeType.CANTEEN]: 'Canteen',
  [IncomeType.OTHERS]: 'Others',
};

export const INCOME_TYPE_OPTIONS: Option<IncomeType>[] = (
  Object.entries(INCOME_TYPE_LABELS) as Array<[string, string]>
).map(([value, label]) => ({
  value: Number.parseInt(value, 10) as IncomeType,
  label,
}));

export const toIncomeTypeLabel = (type: IncomeType): string => INCOME_TYPE_LABELS[type];

export type { Option as IncomeOption };
