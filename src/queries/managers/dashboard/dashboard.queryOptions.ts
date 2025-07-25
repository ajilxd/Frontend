import type { UseQueryOptions } from "@tanstack/react-query";

import { managerFetchDashboard } from "@/features/manager/api/manager.api";
import type { ManagerDashboard } from "@/types";

export const managerDashboardQueryOptions = (
  managerId: string
): UseQueryOptions<ManagerDashboard, Error> => ({
  queryKey: ["manager", "dashboard"],
  queryFn: () => managerFetchDashboard(managerId),
});
