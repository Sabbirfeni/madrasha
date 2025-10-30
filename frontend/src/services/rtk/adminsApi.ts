import type { CreateAdminPayload } from '@/domain/admins/types';
import { emptySplitApi } from '@/services/rtk/baseApi';

type CreateAdminResponse = {
  success: boolean;
  message?: string;
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
  }),
});

export const { useCreateAdminMutation } = adminsApi;
