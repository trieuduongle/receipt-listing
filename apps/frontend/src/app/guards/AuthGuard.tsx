import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthService } from '~/core';
import { useAuth } from '~/hooks';

export const AuthGuard: React.FC = () => {
  const auth = useAuth();
  if (auth.isFetching) {
    return null;
  }

  if (!auth.isSuccess) {
    AuthService.clearToken();
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
