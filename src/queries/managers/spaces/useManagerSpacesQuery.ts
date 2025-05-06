import { useQuery } from "@tanstack/react-query";

import { managerSpaceQueryOptions } from "./spaces.queryOptions";

export const useManagerSpacesQuery = (managerId: string) => {
  return useQuery(managerSpaceQueryOptions(managerId));
};
