import type { UseQueryOptions } from "@tanstack/react-query";

import { ownerFetchAllManagers } from "@/features/owner/api/owner.api";
import type { ManagerType } from "@/types";

export const ownerManagersQueryOptions = (
  ownerId: string
): UseQueryOptions<ManagerType[], Error> => ({
  queryKey: ["owner", "managers", ownerId],
  queryFn: () => ownerFetchAllManagers(ownerId),
  staleTime: 5 * 60 * 1000,
});
