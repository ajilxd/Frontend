import { useQuery } from "@tanstack/react-query";

import { ownerInvoicesQueryOptions } from "./invoice.queryOptions";

export const useInvoicesQuery = (ownerId: string, page: number) => {
  return useQuery(ownerInvoicesQueryOptions(ownerId, page));
};
