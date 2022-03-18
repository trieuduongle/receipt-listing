import { GeneratePresignUrlCommand, PresignUrlModel } from '~/core';
import { rootApiSlice } from './root.api-slice';

export const mediasApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generatePresignUrl: builder.mutation<
      PresignUrlModel,
      GeneratePresignUrlCommand
    >({
      query: (body) => ({
        url: `/medias/get-presign-url?extension=${body.extension}`,
        method: 'GET',
      }),
    }),

    // consider to move to separate API Slice
    uploadMedia: builder.mutation<void, { url: string; file: File }>({
      query: (body) => {
        return {
          url: body.url,
          method: 'PUT',
          body: body.file,
        };
      },
    }),
  }),
});

export const { useGeneratePresignUrlMutation, useUploadMediaMutation } =
  mediasApiSlice;
