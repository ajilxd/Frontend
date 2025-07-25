import type { UseQueryOptions } from "@tanstack/react-query";
import { adminFetchDashboard } from "@/features/admin/api/admin.api";

import type { DashboardTotals } from "@/types";

export const adminDashboardQueryOptions = (): UseQueryOptions<
  DashboardTotals,
  Error
> => ({
  queryKey: ["admin", "dashboard"],
  queryFn: () => adminFetchDashboard(),
});
