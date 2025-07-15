import { useQuery } from "@tanstack/react-query";

import { adminAllUsersQueryOptions } from "./allUsers.queryOptions";

export const useAdminAllUsersQuery = (page: number, itemPerPage: number) => {
  return useQuery(adminAllUsersQueryOptions(page, itemPerPage));
};
