import type { UseQueryOptions } from "@tanstack/react-query";

import {
  userFetchTasksBySpaceId,
  userFetchOwnTasks,
} from "@/features/user/api/user.api";
import type { TaskType } from "@/types";

export const userTasksQueryOptions = (
  userId: string
): UseQueryOptions<TaskType[], Error> => ({
  queryKey: ["user", "tasks", userId],
  queryFn: () => userFetchOwnTasks(userId),
});

export const userTasksBySpaceIdQueryOptions = (
  spaceId: string
): UseQueryOptions<TaskType[], Error> => ({
  queryKey: ["user", "tasks", spaceId],
  queryFn: () => userFetchTasksBySpaceId(spaceId),
});
