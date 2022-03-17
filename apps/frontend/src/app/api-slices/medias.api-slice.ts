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
        const formData = new FormData();
        formData.append('file', body.file);
        formData.append('type', body.file.type);
        return {
          url: body.url,
          method: 'PUT',
          body: formData,
          headers: { authorization: undefined },
        };
      },
    }),
  }),
});

export const { useGeneratePresignUrlMutation, useUploadMediaMutation } =
  mediasApiSlice;
