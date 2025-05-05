import { useQuery } from "@tanstack/react-query";

import { ownerSpacesQueryOptions } from "./space.queryOptions";

export const useSpacesQuery = (ownerId: string) => {
  return useQuery(ownerSpacesQueryOptions(ownerId));
};
