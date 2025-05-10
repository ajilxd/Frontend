import { useQuery } from "@tanstack/react-query";

import { userTasksQueryOptions } from "./task.queryOptions";

export const useUserTaskQuery = (userId: string) => {
  return useQuery(userTasksQueryOptions(userId));
};
