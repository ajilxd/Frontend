import { useQuery } from "@tanstack/react-query";

import { managerTaskQueryOptions } from "./tasks.queryOptions";

export const useManagerTasksByManagerIdQuery = (managerId: string) => {
  return useQuery(managerTaskQueryOptions(managerId));
};
