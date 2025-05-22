import { useQuery } from "@tanstack/react-query";

import { userMeetingsQueryOptions } from "./meeting.queryOptions";

export const useUserMeetingsQuery = (spaceId: string) => {
  return useQuery(userMeetingsQueryOptions(spaceId));
};
