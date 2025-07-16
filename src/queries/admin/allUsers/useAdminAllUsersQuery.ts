import { useQuery } from "@tanstack/react-query";

import { adminAllUsersQueryOptions } from "./allUsers.queryOptions";

export const useAdminAllUsersQuery = (
  page: number,
  itemPerPage: number,
  search: string,
  role: string,
  status: string
) => {
  return useQuery(
    adminAllUsersQueryOptions(page, itemPerPage, search, role, status)
  );
};
