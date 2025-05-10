import { useQuery } from "@tanstack/react-query";

import { userTasksBySpaceIdQueryOptions } from "./task.queryOptions";

export const useUserTasksBySpaceIdQuery = (spaceId: string) => {
  return useQuery(userTasksBySpaceIdQueryOptions(spaceId));
};
