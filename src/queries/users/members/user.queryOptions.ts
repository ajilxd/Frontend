import type { UseQueryOptions } from "@tanstack/react-query";

import { userFetchUsersBySpaceId } from "@/features/user/api/user.api";
import type { UserType } from "@/types";

export const userSpaceMembersQueryOptions = (
  spaceId: string
): UseQueryOptions<UserType[], Error> => ({
  queryKey: ["user", "members", spaceId],
  queryFn: () => userFetchUsersBySpaceId(spaceId),
  staleTime: 10 * 60 * 1000,
});
