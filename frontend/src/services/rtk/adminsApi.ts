import type { CreateAdminPayload, UpdateAdminPayload } from '@/domain/admins/types';
import { emptySplitApi } from '@/services/rtk/baseApi';

type CreateAdminResponse = {
  success: boolean;
  message?: string;
  data?: {
    password: string;
  };
};

export const adminsApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    createAdmin: build.mutation<CreateAdminResponse, CreateAdminPayload>({
      query: (body) => ({
        url: '/admins/add-admin',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admins'],
    }),
    updateAdmin: build.mutation<CreateAdminResponse, { id: string; body: UpdateAdminPayload }>({
      query: ({ id, body }) => ({
        url: `/admins/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Admins'],
    }),
    deleteAdmin: build.mutation<CreateAdminResponse, string>({
      query: (id) => ({
        url: `/admins/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admins'],
    }),
  }),
});

export const { useCreateAdminMutation, useUpdateAdminMutation, useDeleteAdminMutation } = adminsApi;
