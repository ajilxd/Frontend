import { useQuery } from "@tanstack/react-query";

import { userProfileQueryOptions } from "./profile.queryOptions";

export const useUserProfileQuery = (userId: string) => {
  return useQuery(userProfileQueryOptions(userId));
};
