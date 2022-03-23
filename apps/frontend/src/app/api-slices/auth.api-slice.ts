import {
  LoginCommand,
  LoginResponseModel,
  RegisterCommand,
  UserProfileModel,
} from '~/core';
import { RENEW_AFTER_LOGIN, rootApiSlice } from './root.api-slice';

export const authApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<UserProfileModel, void>({
      query: () => '/users/me',
      providesTags: [RENEW_AFTER_LOGIN],
    }),
    login: builder.mutation<LoginResponseModel, LoginCommand>({
      query: (body) => ({ url: '/auth/signin', method: 'POST', body }),
    }),
    register: builder.mutation<LoginResponseModel, RegisterCommand>({
      query: (body) => ({ url: '/auth/signup', method: 'POST', body }),
    }),
  }),
});

export const { useGetMyProfileQuery, useLoginMutation, useRegisterMutation } =
  authApiSlice;
