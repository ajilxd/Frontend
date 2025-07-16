import { useQuery } from "@tanstack/react-query";

import { adminTransactionsQueryOptions } from "./transaction.queryOptions";

export const useAdminTransactionsQuery = (
  page: number,
  itemPerPage: number,
  search: "" | string,
  status: "fail" | "success" | ""
) => {
  return useQuery(
    adminTransactionsQueryOptions(page, itemPerPage, search, status)
  );
};
