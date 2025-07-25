import type { UseQueryOptions } from "@tanstack/react-query";

import { ownerFetchDashboard } from "@/features/owner/api/owner.api";
import type { OwnerDashboard } from "@/types";

export const ownerDashboardQueryOptions = (
  ownerId: string
): UseQueryOptions<OwnerDashboard, Error> => ({
  queryKey: ["owner", "dashboard"],
  queryFn: () => ownerFetchDashboard(ownerId),
});
