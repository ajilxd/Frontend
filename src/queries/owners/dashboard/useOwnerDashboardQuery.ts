import { useQuery } from "@tanstack/react-query";

import { ownerDashboardQueryOptions } from "./dashboard.queryOptions";

export const useOwnerDashboardQuery = (ownerId: string) => {
  return useQuery(ownerDashboardQueryOptions(ownerId));
};
