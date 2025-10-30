import { EmployeeListItem } from '@/domain/employees/types';
import { emptySplitApi } from '@/services/rtk/baseApi';

type EmployeesResponse = {
  success: boolean;
  data?: {
    docs: EmployeeListItem[];
  };
};

export const employeesApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getEmployees: build.query<EmployeeListItem[], { page?: number; limit?: number } | void>({
      query: (params) => {
        const page = params?.page ?? 1;
        const limit = params?.limit ?? 50;
        return `/employees?page=${page}&limit=${limit}`;
      },
      transformResponse: (response: EmployeesResponse) => response?.data?.docs ?? [],
      providesTags: ['Employees'],
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetEmployeesQuery, useLazyGetEmployeesQuery } = employeesApi;
