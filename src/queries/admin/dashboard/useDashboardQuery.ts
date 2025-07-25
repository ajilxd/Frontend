import { useQuery } from "@tanstack/react-query";
import { adminDashboardQueryOptions } from "./dashboard.queryOptions";

export const useAdminDashboardQuery = () => {
  return useQuery(adminDashboardQueryOptions());
};
