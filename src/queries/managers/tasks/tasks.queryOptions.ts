import type { UseQueryOptions } from "@tanstack/react-query";

import {
  managerGetTasksByManagerId,
  managerGetTasksByTaskId,
  managerGetTasksBySpaceId,
} from "@/features/manager/api/manager.api";
import type { TaskType } from "@/types";

export const managerTaskQueryOptions = (
  managerId: string
): UseQueryOptions<TaskType[], Error> => ({
  queryKey: ["manager", "tasks", managerId],
  queryFn: () => managerGetTasksByManagerId(managerId),
  staleTime: 5 * 60 * 1000,
});

export const managerGetTasksByTaskIdOptions = (
  taskId: string
): UseQueryOptions<TaskType[], Error> => ({
  queryKey: ["manager", "tasks", taskId],
  queryFn: () => managerGetTasksByTaskId(taskId),
  staleTime: 5 * 60 * 1000,
});

export const managerGetTasksBySpaceIdOptions = (
  spaceId: string
): UseQueryOptions<TaskType[], Error> => ({
  queryKey: ["manager", "tasks", spaceId],
  queryFn: () => managerGetTasksBySpaceId(spaceId),
  staleTime: 5 * 60 * 1000,
});
