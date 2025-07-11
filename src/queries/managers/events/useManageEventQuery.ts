import { useQuery } from "@tanstack/react-query";
import { managerEventsQueryOptions } from "./event.queryOptions";

export const useManagerEventsQuery = (managerId: string) => {
  return useQuery(managerEventsQueryOptions(managerId));
};
