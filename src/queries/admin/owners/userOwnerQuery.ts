import { useQuery } from "@tanstack/react-query";

import { adminOwnerQueryOptions } from "./owners.queryOptions";

export const useOwnersQuery = (page: number) => {
  return useQuery(adminOwnerQueryOptions(page));
};
