import {
  type CacheConfig,
  type FetchOptions,
  type PaginationResult,
  serverGet,
} from '@/services/api';

type AdminListItem = {
  _id: string;
  fullname: string;
  phone_number: string;
  role: number;
  createdAt: string;
};

const getAdmins = async (fetchOptions?: FetchOptions, cacheConfig?: CacheConfig) => {
  const response = await serverGet<PaginationResult<AdminListItem>>(
    '/admins',
    fetchOptions,
    cacheConfig,
  );
  return response.data;
};

export { getAdmins };
