type ApiError = {
  status: number;
  statusText: string;
  message?: string;
};

type CacheConfig = {
  cache?: boolean;
  life?: 'default' | 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'max';
  tags?: string[];
};

type FetchOptions = {
  throw?: boolean;
  query?: Record<string, string | number | boolean | undefined>;
  params?: Record<string, string | number>;
};

type PaginationResult<T> = {
  docs: T[];
  total: number;
  page: number;
  pages: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type { ApiError, CacheConfig, FetchOptions, PaginationResult };
