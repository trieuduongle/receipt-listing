import {
  CreateReceiptCommand,
  DEFAULT_PAGE_SIZE,
  PaginatedList,
  PaginationQuery,
  ReceiptMediaDetailModel,
  ReceiptModel,
} from '~/core';
import { buildParams } from '~/utils';
import { RECEIPTS_TAG, rootApiSlice } from './root.api-slice';

type ReceiptMediaDetailsQuery = PaginationQuery<{ receiptId: number }>;

export const receiptsApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReceipts: builder.query<PaginatedList<ReceiptModel>, PaginationQuery>({
      query: (query) => {
        console.log(`/receipts${buildParams(query)}`);
        return `/receipts${buildParams(query)}`;
      },
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

    // TODO: enhance this with actual get by id.
    getReceiptDetail: builder.query<ReceiptModel, number>({
      query: () => {
        const query: PaginationQuery = { page: 0, size: DEFAULT_PAGE_SIZE };

        return `/receipts${buildParams(query)}`;
      },
      transformResponse: (
        rawResult: PaginatedList<ReceiptModel>,
        _meta,
        id
      ) => {
        const receipt = rawResult.content.find((item) => item.id === id);
        if (!receipt) {
          throw new Error(`Not found receipt ${id}`);
        }

        return receipt;
      },
    }),
    getReceiptMediaDetails: builder.query<
      PaginatedList<ReceiptMediaDetailModel>,
      ReceiptMediaDetailsQuery
    >({
      query: ({ receiptId, ...query }) =>
        `/receipts/${receiptId}/medias${buildParams(query)}`,
    }),
  }),
});

export const {
  useCreateReceiptMutation,
  useGetReceiptsQuery,
  useGetReceiptDetailQuery,
  useGetReceiptMediaDetailsQuery,
} = receiptsApiSlice;
