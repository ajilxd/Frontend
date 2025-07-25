import { useQuery } from "@tanstack/react-query";
import { managerDashboardQueryOptions } from "./dashboard.queryOptions";

export const useManagerDashboardQuery = (managerId: string) => {
  return useQuery(managerDashboardQueryOptions(managerId));
};
