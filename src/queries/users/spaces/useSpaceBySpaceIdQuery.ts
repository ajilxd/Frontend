import { useQuery } from "@tanstack/react-query";

import { userGetSpaceByIdQueryOptions } from "./space.queryOptions";

export const useUserSpaceBySpaceIdQuery = (userId: string, spaceId: string) => {
  return useQuery(userGetSpaceByIdQueryOptions(userId, spaceId));
};
