import { CreateReceiptCommand } from '~/core';
import { rootApiSlice } from './root.api-slice';

export const receiptsApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReceipt: builder.mutation<void, CreateReceiptCommand>({
      query: (body) => ({
        url: `/receipts`,
        method: 'POST',
        body,
      }),
    }),
    uploadMedia: builder.mutation<void, { url: string; file: File }>({
      query: (body) => {
        const formData = new FormData();
        formData.append('file', body.file);
        formData.append('type', body.file.type);
        return {
          url: body.url,
          method: 'PUT',
          body: formData,
        };
      },
    }),
  }),
});

export const { useCreateReceiptMutation } = receiptsApiSlice;
