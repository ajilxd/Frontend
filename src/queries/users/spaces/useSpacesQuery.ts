import { useQuery } from "@tanstack/react-query";

import { userSpacesQueryOptions } from "./space.queryOptions";

export const useUserSpacesQuery = (userId: string) => {
  return useQuery(userSpacesQueryOptions(userId));
};
