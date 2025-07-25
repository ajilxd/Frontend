import { useQuery } from "@tanstack/react-query";

import { adminSubscriberQueryOptions } from "./subscribers.queryOptions";

export const useSubscriberQuery = (
  page: number,
  itemPerPage: number,
  search: string,
  status: string
) => {
  return useQuery(
    adminSubscriberQueryOptions(page, itemPerPage, search, status)
  );
};
