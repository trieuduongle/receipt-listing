import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { environment } from 'src/environments/environment';
import { AuthService } from '~/core';

export const RECEIPTS_TAG = 'receipts';
export const RENEW_AFTER_LOGIN = 'renewAfterLogin';

const reducerPath = 'api';
/**
 * `1 Base Url` should have `1 API slice` only.
 * Therefore, if you you have many endpoints, you should extends this slice
 * through `injectEndPoints` method.
 *
 * Reference:
 * 1. General idea: https://redux-toolkit.js.org/tutorials/rtk-query#setting-up-your-store-and-api-service
 * 2. How to extends root slice with `injectEndpoints` https://redux-toolkit.js.org/rtk-query/usage/code-splitting
 */
export const rootApiSlice = createApi({
  reducerPath,
  baseQuery: fetchBaseQuery({
    baseUrl: environment.apiEndpoint + '/api',
    prepareHeaders: (headers, api) => {
      // TODO: find better way to ignore headers
      if (api.endpoint === 'uploadMedia') {
        return headers;
      }

      const accessToken = AuthService.getToken();
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [RECEIPTS_TAG, RENEW_AFTER_LOGIN],
});
