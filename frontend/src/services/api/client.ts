import { API_URL } from '@/config/api';
import { type BetterFetchOption, createFetch } from '@better-fetch/fetch';

import type { ApiResponse, FetchOptions } from './types';

const betterFetch = createFetch({
  baseURL: API_URL,
  retry: 3,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

type Error = {
  status: number;
  statusText: string;
};

const publicGet = async <T, E = unknown>(endpoint: string, fetchOptions?: FetchOptions) => {
  console.log('publicGet', endpoint);
  const { throw: shouldThrow, query, params, ...restOptions } = fetchOptions || {};

  let url = endpoint;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value));
    });
  }

  const { data, error } = await betterFetch<ApiResponse<T>, Error & E>(url, {
    query,
    ...restOptions,
  } as BetterFetchOption);
  if (shouldThrow && error) throw error;
  console.log('publicGet response', { data: data?.data, error });
  return { data: data?.data, error };
};

const publicPost = async <T, E = unknown>(
  endpoint: string,
  body: Record<string, unknown>,
  fetchOptions?: FetchOptions,
) => {
  const { throw: shouldThrow, query, params, ...restOptions } = fetchOptions || {};

  let url = endpoint;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value));
    });
  }

  const { data, error } = await betterFetch<ApiResponse<T>, Error & E>(url, {
    method: 'POST',
    body: JSON.stringify(body),
    query,
    ...restOptions,
  } as BetterFetchOption);
  if (shouldThrow && error) throw error;
  return { data: data?.data, error };
};

export { publicGet, publicPost };
