import type { Employee } from '@/domain/employees';
import {
  type CacheConfig,
  type FetchOptions,
  type PaginationResult,
  publicPatch,
  publicPost,
  serverGet,
} from '@/services/api';

import type { CreateEmployeeInput, UpdateEmployeeInput } from './types';

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

const getEmployeeById = async (id: string, fetchOptions?: FetchOptions) => {
  const response = await serverGet<Employee>('/employees/:id', {
    ...fetchOptions,
    params: { id },
  });
  return response.data;
};

export { getEmployeeById };

const updateEmployee = async (
  id: string,
  body: UpdateEmployeeInput,
  fetchOptions?: FetchOptions,
) => {
  const response = await publicPatch<unknown>('/employees/:id', body, {
    ...fetchOptions,
    params: { id },
  });
  return response;
};

export { updateEmployee };
