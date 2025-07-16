import { useQuery } from "@tanstack/react-query";

import { adminTransactionsQueryOptions } from "./transaction.queryOptions";

export const useAdminTransactionsQuery = (
  page: number,
  itemPerPage: number
) => {
  return useQuery(adminTransactionsQueryOptions(page, itemPerPage));
};
