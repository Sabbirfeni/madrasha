import { cacheLife, cacheTag } from 'next/cache';

import { publicGet } from './client';
import type { CacheConfig, FetchOptions } from './types';

const applyCacheConfig = (config: CacheConfig) => {
  if (config.life) cacheLife(config.life as Parameters<typeof cacheLife>[0]);
  if (config.tags?.length) config.tags.forEach((tag) => cacheTag(tag));
};

const cachedGet = async <T, E = unknown>(
  endpoint: string,
  fetchOptions?: FetchOptions,
  cacheConfig?: CacheConfig,
) => {
  'use cache';
  if (cacheConfig) applyCacheConfig(cacheConfig);
  return publicGet<T, E>(endpoint, fetchOptions);
};

const serverGet = async <T, E = unknown>(
  endpoint: string,
  fetchOptions?: FetchOptions,
  cacheConfig?: CacheConfig,
) => {
  if (cacheConfig?.cache === false) {
    return publicGet<T, E>(endpoint, fetchOptions);
  }

  return cachedGet<T, E>(endpoint, fetchOptions, cacheConfig);
};

export { serverGet };
