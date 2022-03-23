import {
  CreateReceiptCommand,
  PaginatedList,
  PaginationQuery,
  ReceiptMediaDetailModel,
  ReceiptModel,
} from '~/core';
import { buildParams } from '~/utils';
import {
  RECEIPTS_TAG,
  RENEW_AFTER_LOGIN,
  rootApiSlice,
} from './root.api-slice';

type ReceiptMediaDetailsQuery = PaginationQuery<{ receiptId: number }>;

export const receiptsApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReceipts: builder.query<PaginatedList<ReceiptModel>, PaginationQuery>({
      query: (query) => `/receipts${buildParams(query)}`,
      providesTags: [RECEIPTS_TAG, RENEW_AFTER_LOGIN],
    }),
    createReceipt: builder.mutation<void, CreateReceiptCommand>({
      query: (body) => ({
        url: `/receipts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [RECEIPTS_TAG],
    }),

    getReceiptDetail: builder.query<ReceiptModel, number>({
      query: (id) => `/receipts/${id}`,
      providesTags: [RENEW_AFTER_LOGIN],
    }),
    getReceiptMediaDetails: builder.query<
      PaginatedList<ReceiptMediaDetailModel>,
      ReceiptMediaDetailsQuery
    >({
      query: ({ receiptId, ...query }) =>
        `/receipts/${receiptId}/medias${buildParams(query)}`,
      providesTags: [RENEW_AFTER_LOGIN],
    }),
  }),
});

export const {
  useCreateReceiptMutation,
  useGetReceiptsQuery,
  useGetReceiptDetailQuery,
  useGetReceiptMediaDetailsQuery,
} = receiptsApiSlice;
