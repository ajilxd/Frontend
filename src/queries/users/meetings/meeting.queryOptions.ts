import type { UseQueryOptions } from "@tanstack/react-query";

import { userFetchMeetings } from "@/features/user/api/user.api";
import type { MeetingType } from "@/types";

export const userMeetingsQueryOptions = (
  spaceId: string
): UseQueryOptions<MeetingType[], Error> => ({
  queryKey: ["user", "meetings", spaceId],
  queryFn: () => userFetchMeetings(spaceId),
  staleTime: 10 * 60 * 1000,
});
