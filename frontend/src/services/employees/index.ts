import {
  type CacheConfig,
  type FetchOptions,
  type PaginationResult,
  serverGet,
} from '@/services/api';

import type { Employee } from './types';

const getEmployees = async (fetchOptions?: FetchOptions, cacheConfig?: CacheConfig) => {
  console.log('getEmployees');
  const response = await serverGet<PaginationResult<Employee>>(
    '/employees',
    fetchOptions,
    cacheConfig,
  );
  console.log('server Get', response);
  return response.data;
};

export { getEmployees };
