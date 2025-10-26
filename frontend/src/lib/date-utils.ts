import dayjs from 'dayjs';

export const getCurrentYear = () => {
  if (typeof window === 'undefined') return 2024;
  return dayjs().year();
};

export const getTodayDate = () => {
  if (typeof window === 'undefined') return '2024-01-01';
  return dayjs().format('YYYY-MM-DD');
};

export const formatDate = (date: string | Date) => {
  if (typeof window === 'undefined') return '';
  return dayjs(date).format('MM/DD/YYYY');
};
