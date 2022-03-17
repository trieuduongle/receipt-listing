import {
  CreateReceiptCommand,
  PaginatedList,
  PaginationQuery,
  ReceiptModel,
} from '~/core';
import { RECEIPTS_TAG, rootApiSlice } from './root.api-slice';

export const receiptsApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReceipts: builder.query<PaginatedList<ReceiptModel>, PaginationQuery>({
      query: (query) => `/receipts?page=0&size=10`,
      providesTags: [RECEIPTS_TAG],
    }),
    createReceipt: builder.mutation<void, CreateReceiptCommand>({
      query: (body) => ({
        url: `/receipts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [RECEIPTS_TAG],
    }),
  }),
});

export const { useCreateReceiptMutation, useGetReceiptsQuery } =
  receiptsApiSlice;
