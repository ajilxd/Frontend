import type { UseQueryOptions } from "@tanstack/react-query";

import { userFetchEvents } from "@/features/user/api/user.api";
import type { EventType } from "@/types";

export const userEventsQueryOptions = (
  userId: string
): UseQueryOptions<EventType[], Error> => ({
  queryKey: ["user", "events", userId],
  queryFn: () => userFetchEvents(userId),
});
