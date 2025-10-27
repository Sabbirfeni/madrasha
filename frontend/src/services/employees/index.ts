import { type CacheConfig, type PaginationResult, serverGet } from '@/services/api';

import type { Employee } from './types';

const getEmployees = async (cacheConfig?: CacheConfig) => {
  console.log('getEmployees');
  const response = await serverGet<PaginationResult<Employee>>('/employees', {}, cacheConfig);

  return response.data;
};

export { getEmployees };
