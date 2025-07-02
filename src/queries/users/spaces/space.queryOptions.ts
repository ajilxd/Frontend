import type { UseQueryOptions } from "@tanstack/react-query";

import {
  userFetchSpaceBySpaceId,
  userFetchSpaces,
} from "@/features/user/api/user.api";
import type { SpaceType } from "@/types";

export const userSpacesQueryOptions = (
  userId: string
): UseQueryOptions<SpaceType[], Error> => ({
  queryKey: ["user", "spaces", userId],
  queryFn: () => userFetchSpaces(userId),
});

export const userGetSpaceByIdQueryOptions = (
  userId: string,
  spaceId: string
): UseQueryOptions<SpaceType, Error> => ({
  queryKey: ["user", "spaces", userId, spaceId],
  queryFn: () => userFetchSpaceBySpaceId(spaceId),
});
