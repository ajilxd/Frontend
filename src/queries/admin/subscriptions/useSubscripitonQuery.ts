import { useQuery } from "@tanstack/react-query";

import { adminSubscripitonsQueryOptions } from "./subscription.queryOptions";

export const useSubscriptonsQuery = (
  page: number,
  itemPerPage: number,
  search: string,
  billingCycle: string,
  status: string
) => {
  return useQuery(
    adminSubscripitonsQueryOptions(
      page,
      itemPerPage,
      search,
      billingCycle,
      status
    )
  );
};
