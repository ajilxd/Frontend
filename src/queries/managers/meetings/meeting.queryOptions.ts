import type { UseQueryOptions } from "@tanstack/react-query";

import { managerFetchMeetings } from "@/features/manager/api/manager.api";
import type { MeetingType } from "@/types";

export const managerMeetingsQueryOptions = (
  spaceId: string
): UseQueryOptions<MeetingType[], Error> => ({
  queryKey: ["manager", "meetings", spaceId],
  queryFn: () => managerFetchMeetings(spaceId),
  staleTime: 10 * 60 * 1000,
});
