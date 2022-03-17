interface PaginationRequest {
  page: number;
  size: number;
}

export type PaginationQuery<Data extends object = Record<string, unknown>> =
  Data & PaginationRequest;
