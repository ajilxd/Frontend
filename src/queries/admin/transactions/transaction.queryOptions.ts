import type { UseQueryOptions } from "@tanstack/react-query";
import { adminFetchAllTransactions } from "@/features/admin/api/admin.api";

import type { TransactionType } from "@/types";

export const adminTransactionsQueryOptions = (
  page: number,
  itemPerPage: number
): UseQueryOptions<
  { transactions: TransactionType[]; totalPage: number },
  Error
> => ({
  queryKey: ["admin", "transactions"],
  queryFn: () => adminFetchAllTransactions(page,itemPerPage),
  staleTime: 5 * 60 * 1000,
});
