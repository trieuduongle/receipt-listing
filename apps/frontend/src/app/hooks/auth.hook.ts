import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMyProfileQuery } from '~/api-slices';
import { AuthService, UserProfileModel } from '~/core';

export interface UseAuthReturnType {
  token: string;
  profile?: UserProfileModel;
  isSuccess: boolean;
  isFetching: boolean;
}

export const useAuth = (): UseAuthReturnType => {
  const navigate = useNavigate();
  const token = AuthService.getToken();
  const {
    data: profile,
    isError,
    isSuccess,
    isFetching,
  } = useGetMyProfileQuery(token ? undefined : skipToken);

  useEffect(() => {
    if (!isFetching && isError) {
      console.log('error');
      // AuthService.clearToken();
      // navigate('/login');
    }
  }, [isError, isFetching, navigate]);

  return { profile, token, isSuccess, isFetching };
};
