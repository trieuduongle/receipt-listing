// Inspired by https://github.com/reduxjs/redux-toolkit/discussions/1163

import { QueryDefinition } from '@reduxjs/toolkit/dist/query';
import { QueryHooks } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '~/core';

// infer result type from endpoint - there is probably a better way of doing this
type GetResultTypeFromEndpoint<Endpoint> = Endpoint extends QueryHooks<
  QueryDefinition<any, any, string, infer ResultType, string>
>
  ? ResultType
  : never;

interface UseInfiniteQueryOptions<ResultType> {
  defaultPage?: number;
  defaultSize?: number;
  getNextPageParam(lastPage?: ResultType): any;
  getActualCurrentPageSize(page?: ResultType): number;
}

export function useInfiniteQuery<
  Endpoint extends QueryHooks<QueryDefinition<any, any, any, any, any>>,
  ResultType = GetResultTypeFromEndpoint<Endpoint>
>(endpoint: Endpoint, defaultOptions: UseInfiniteQueryOptions<ResultType>) {
  const nextPage = useRef<number | undefined>(undefined);
  const [pages, setPages] = useState<Array<ResultType> | undefined>(undefined);
  const [trigger, result] = endpoint.useLazyQuery();
  const [total, setTotal] = useState(0);

  const options = useState<Required<UseInfiniteQueryOptions<ResultType>>>({
    ...defaultOptions,
    defaultPage: defaultOptions.defaultPage || DEFAULT_PAGE,
    defaultSize: defaultOptions.defaultSize || DEFAULT_PAGE_SIZE,
  })[0];

  const fetchData = useCallback(
    (page?: number) => {
      trigger({ page: page || options.defaultPage, size: options.defaultSize });
    },
    [trigger, options]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!result.isSuccess) return;
    nextPage.current = options.getNextPageParam(result.data);
    setPages((data) => [...(data ?? []), result.data]);
    setTotal((data) => data + options.getActualCurrentPageSize(result.data));
  }, [result.data, result.isSuccess, options]);

  return {
    ...result,
    data: pages,
    isLoading: result.isFetching && pages === undefined,
    hasNextPage: nextPage.current !== undefined,
    total,
    fetchNextPage() {
      if (nextPage.current !== undefined) {
        fetchData(nextPage.current);
      }
    },
  };
}
