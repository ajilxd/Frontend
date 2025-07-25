import type { UseQueryOptions } from "@tanstack/react-query";

import { userFetchDashboard } from "@/features/user/api/user.api";
import type { UserDashboard } from "@/types";

export const userDashboardQueryOptions = (
  userId: string
): UseQueryOptions<UserDashboard, Error> => ({
  queryKey: ["user", "dashboard"],
  queryFn: () => userFetchDashboard(userId),
});
