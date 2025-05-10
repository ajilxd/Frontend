import { useQuery } from "@tanstack/react-query";

import { userSpaceMembersQueryOptions } from "./user.queryOptions";

export const useUserSpaceMembersQuery = (spaceId: string) => {
  return useQuery(userSpaceMembersQueryOptions(spaceId));
};
