import { useQuery } from "@tanstack/react-query";

import { managerGetTasksBySpaceIdOptions } from "./tasks.queryOptions";

export const useManagerTasksBySpaceIdQuery = (spaceId: string) => {
  return useQuery(managerGetTasksBySpaceIdOptions(spaceId));
};
