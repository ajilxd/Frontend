import type { UseQueryOptions } from "@tanstack/react-query";

import {
  ownerFetchSpace,
  ownerFetchSpaceBySpaceId,
} from "@/features/owner/api/owner.api";
import type { SpaceType } from "@/types";

export const ownerSpacesQueryOptions = (
  ownerId: string
): UseQueryOptions<SpaceType[], Error> => ({
  queryKey: ["owner", "spaces", ownerId],
  queryFn: () => ownerFetchSpace(ownerId),
  staleTime: Infinity,
});

export const ownerGetSpaceByIdQueryOptions = (
  spaceId: string
): UseQueryOptions<SpaceType, Error> => ({
  queryKey: ["owner", "spaces", spaceId],
  queryFn: () => ownerFetchSpaceBySpaceId(spaceId),
  staleTime: Infinity,
});
