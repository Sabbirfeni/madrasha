import { publicGet } from './client';
import type { CacheConfig, FetchOptions } from './types';

const serverGet = async <T, E = unknown>(
  endpoint: string,
  fetchOptions?: FetchOptions,
  cacheConfig?: CacheConfig,
) => {
  // In Next.js 15, caching is handled via fetch options
  // If cache is disabled, add no-store to fetch options
  if (cacheConfig?.cache === false) {
    return publicGet<T, E>(endpoint, {
      ...fetchOptions,
      cache: 'no-store',
    });
  }

  return publicGet<T, E>(endpoint, fetchOptions);
};

export { serverGet };
