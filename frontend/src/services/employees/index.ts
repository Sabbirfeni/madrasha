import type { Employee } from '@/domain/employees';
import {
  type CacheConfig,
  type FetchOptions,
  type PaginationResult,
  publicPost,
  serverGet,
} from '@/services/api';

import type { CreateEmployeeInput } from './types';

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

const createEmployee = async (body: CreateEmployeeInput, fetchOptions?: FetchOptions) => {
  const response = await publicPost<unknown>('/employees/add-employee', body, fetchOptions);
  return response;
};

export { createEmployee };
