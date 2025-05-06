import type { UseQueryOptions } from "@tanstack/react-query";

import { managerFetchUsers } from "@/features/manager/api/manager.api";
import type { UserType } from "@/types";

export const managerUserQueryOptions = (
  managerId: string
): UseQueryOptions<UserType[], Error> => ({
  queryKey: ["manager", "users", managerId],
  queryFn: () => managerFetchUsers(managerId),
});
