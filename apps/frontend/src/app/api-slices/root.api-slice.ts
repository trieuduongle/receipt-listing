import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { environment } from 'src/environments/environment';

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
    prepareHeaders: (headers) => {
      // TODO: change this after has sign in/up feature.
      // const accessToken =
      //   'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjQ3NDAzNzM4LCJleHAiOjE2NDc0MDczMzh9.1z4ursRf31yHexTg6aWkqDKt7LNI0Ad3TfNU36Ekrcz-jHfT8OO5uedtXBQwnwrd0MjDsoPs3YrKj_SkjMEJSg';
      // if (accessToken) {
      //   headers.set('authorization', `Bearer ${accessToken}`);
      // }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [],
});
