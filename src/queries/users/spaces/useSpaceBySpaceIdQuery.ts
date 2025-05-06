import { useQuery } from "@tanstack/react-query";

import { userGetSpaceByIdQueryOptions } from "./space.queryOptions";

export const useSpaceBySpaceIdQuery = (spaceId: string) => {
  return useQuery(userGetSpaceByIdQueryOptions(spaceId));
};
