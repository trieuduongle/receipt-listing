const ACCESS_TOKEN_KEY = 'accessToken';

export const saveToken = (token: string) =>
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);
export const getToken = () => localStorage.getItem(ACCESS_TOKEN_KEY) || '';
