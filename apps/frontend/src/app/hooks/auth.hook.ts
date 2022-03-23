import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useGetMyProfileQuery } from '~/api-slices';
import { AuthService, UserProfileModel } from '~/core';

export interface UseAuthReturnType {
  token: string;
  profile?: UserProfileModel;
  isSuccess: boolean;
  isFetching: boolean;
}

export const useAuth = (): UseAuthReturnType => {
  const token = AuthService.getToken();
  const {
    data: profile,
    isSuccess,
    isFetching,
  } = useGetMyProfileQuery(token ? undefined : skipToken);

  return { profile, token, isSuccess, isFetching };
};
