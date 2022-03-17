import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { environment } from 'src/environments/environment';

export const RECEIPTS_TAG = 'receipts';

const reducerPath = 'api/receiptCollector';
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

      // TODO: change this after has sign in/up feature.
      const accessToken =
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjQ3NTExMjQ2LCJleHAiOjE2NDc1MTQ4NDZ9.59MuqUBrXF4ybqnDfo0LXs2e1pwmpPRZh1iwsLiy50GL4PkH4Uid-Jh6eBTPQN_QgdMs93AS1-FcmT8N6dvGuA';
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [RECEIPTS_TAG],
});
