import { type CacheConfig, type FetchOptions, serverGet } from '@/services/api';

import type { MonthlyDonations, MonthlyIncomeExpense, OverviewStats } from './types';

const getOverviewStats = async (fetchOptions?: FetchOptions, cacheConfig?: CacheConfig) => {
  const response = await serverGet<OverviewStats>(
    '/analytics/overview-stats',
    fetchOptions,
    cacheConfig,
  );
  return response.data;
};

const getIncomeExpenseComparison = async (
  fetchOptions?: FetchOptions,
  cacheConfig?: CacheConfig,
) => {
  const response = await serverGet<MonthlyIncomeExpense[]>(
    '/analytics/income-expense-comparison',
    fetchOptions,
    cacheConfig,
  );
  return response.data;
};

const getDonationsByMonth = async (fetchOptions?: FetchOptions, cacheConfig?: CacheConfig) => {
  const response = await serverGet<MonthlyDonations[]>(
    '/analytics/donations-by-month',
    fetchOptions,
    cacheConfig,
  );
  return response.data;
};

export { getOverviewStats, getIncomeExpenseComparison, getDonationsByMonth };
