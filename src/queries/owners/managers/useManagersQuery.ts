import { useQuery } from "@tanstack/react-query";

import { ownerManagersQueryOptions } from "./manager.queryOptions";

export const useManagersQuery = (ownerId: string) => {
  return useQuery(ownerManagersQueryOptions(ownerId));
};
