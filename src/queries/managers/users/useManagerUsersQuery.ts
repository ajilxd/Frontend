import { useQuery } from "@tanstack/react-query";

import { managerUserQueryOptions } from "./users.queryOptions";

export const useManagerUsersQuery = (managerId: string) => {
  return useQuery(managerUserQueryOptions(managerId));
};
