import type { UseQueryOptions } from "@tanstack/react-query";

import { managerGetData } from "@/features/manager/api/manager.api";
import type { ManagerType } from "@/types";

export const managerProfileQueryOptions = (
  managerId: string
): UseQueryOptions<ManagerType, Error> => ({
  queryKey: ["manager", "profile", managerId],
  queryFn: () => managerGetData(managerId),
});
