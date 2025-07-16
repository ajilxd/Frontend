import type { UseQueryOptions } from "@tanstack/react-query";
import { adminFetchAllTransactions } from "@/features/admin/api/admin.api";

import type { TransactionType } from "@/types";

export const adminTransactionsQueryOptions = (
  page: number,
  itemPerPage: number,
  search: "" | string,
  status: "fail" | "success" | ""
): UseQueryOptions<
  { transactions: TransactionType[]; totalPage: number },
  Error
> => ({
  queryKey: ["admin", "transactions", { page, search, status }],
  queryFn: () => adminFetchAllTransactions(page, itemPerPage, search, status),
  staleTime: 5 * 60 * 1000,
});
