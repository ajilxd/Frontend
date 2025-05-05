import { useQuery } from "@tanstack/react-query";

import { ownerGetSpaceByIdQueryOptions } from "./space.queryOptions";

export const useSpaceBySpaceIdQuery = (ownerId: string) => {
  return useQuery(ownerGetSpaceByIdQueryOptions(ownerId));
};
