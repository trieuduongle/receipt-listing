import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { environment } from 'src/environments/environment';

export const RECEIPTS_TAG = 'receipts';

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

      // TODO: change this after has sign in/up feature.
      const accessToken =
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjQ3NTY5MTY2LCJleHAiOjE2NDc1NzI3NjZ9.H5uCBArt7beGlcZh6gl3cfdZME5wf2J_tFKHPozV2TjzwXJKwH0iHjDtqvLX0hOYhqjvVsIg9fwUlrIOoHZ1Gg';
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [RECEIPTS_TAG],
});
