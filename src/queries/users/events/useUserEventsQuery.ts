import { useQuery } from "@tanstack/react-query";
import { userEventsQueryOptions } from "./event.queryOptions";

export const useUserEventsQuery = (spaceId: string) => {
  return useQuery(userEventsQueryOptions(spaceId));
};
