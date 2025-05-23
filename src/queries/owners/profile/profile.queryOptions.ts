import type { UseQueryOptions } from "@tanstack/react-query";

import { ownerGetData } from "@/features/owner/api/owner.api";
import type { OwnerType } from "@/types";

export const ownerProfileQueryOptions = (
  ownerId: string
): UseQueryOptions<OwnerType, Error> => ({
  queryKey: ["owner", "profile", ownerId],
  queryFn: () => ownerGetData(ownerId),
});
