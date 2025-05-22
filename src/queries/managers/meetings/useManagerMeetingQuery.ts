import { useQuery } from "@tanstack/react-query";

import { managerMeetingsQueryOptions } from "./meeting.queryOptions";

export const useManagerMeetingsQuery = (spaceId: string) => {
  return useQuery(managerMeetingsQueryOptions(spaceId));
};
