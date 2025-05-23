import { useQuery } from "@tanstack/react-query";

import { ownerProfileQueryOptions } from "./profile.queryOptions";

export const useOwnerProfileQuery = (managerId: string) => {
  return useQuery(ownerProfileQueryOptions(managerId));
};
