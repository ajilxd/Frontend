import { useQuery } from "@tanstack/react-query";

import { managerGetTasksByTaskIdOptions } from "./tasks.queryOptions";

export const useManagerTasksByTaskIdQuery = (taskId: string) => {
  return useQuery(managerGetTasksByTaskIdOptions(taskId));
};
