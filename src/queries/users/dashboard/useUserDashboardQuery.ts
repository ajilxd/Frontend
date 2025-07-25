import { useQuery } from "@tanstack/react-query";

import { userDashboardQueryOptions } from "./dashboard.queryOptions";

export const useUserDashboardQuery = (userId: string) => {
  return useQuery(userDashboardQueryOptions(userId));
};
