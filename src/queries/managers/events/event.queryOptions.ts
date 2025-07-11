import type { UseQueryOptions } from "@tanstack/react-query";

import { managerFetchEvents } from "@/features/manager/api/manager.api";
import type { EventType } from "@/types";

export const managerEventsQueryOptions = (
  managerId: string
): UseQueryOptions<EventType[], Error> => ({
  queryKey: ["manager", "events", managerId],
  queryFn: () => managerFetchEvents(managerId),
});
