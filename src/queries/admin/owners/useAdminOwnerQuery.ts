import { useQuery } from "@tanstack/react-query";

import { adminOwnerQueryOptions } from "./owners.queryOptions";

export const useAdminOwnersQuery = (page: number) => {
  return useQuery(adminOwnerQueryOptions(page));
};
