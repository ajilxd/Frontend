import type { UseQueryOptions } from "@tanstack/react-query";

import { managerFetchSpace } from "@/features/manager/api/manager.api";
import type { SpaceType } from "@/types";

export const managerSpaceQueryOptions = (
  managerId: string
): UseQueryOptions<SpaceType[], Error> => ({
  queryKey: ["manager", "spaces", managerId],
  queryFn: () => managerFetchSpace(managerId),
});
