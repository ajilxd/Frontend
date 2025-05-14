import { useQuery } from "@tanstack/react-query";

import { ownerGetSpaceByIdQueryOptions } from "./space.queryOptions";

export const useOwnerSpaceBySpaceIdQuery = (ownerId: string) => {
  return useQuery(ownerGetSpaceByIdQueryOptions(ownerId));
};
