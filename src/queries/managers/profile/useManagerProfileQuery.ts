import { useQuery } from "@tanstack/react-query";

import { managerProfileQueryOptions } from "./profile.queryOptions";

export const useManagerProfileQuery = (managerId: string) => {
  return useQuery(managerProfileQueryOptions(managerId));
};
