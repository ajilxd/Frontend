import { useQuery } from "@tanstack/react-query";

import { userSpacesQueryOptions } from "./space.queryOptions";

export const useSpacesQuery = (userId: string) => {
  return useQuery(userSpacesQueryOptions(userId));
};
