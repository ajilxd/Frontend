import type { UseQueryOptions } from "@tanstack/react-query";

import { adminFetchAllUsers } from "@/features/admin/api/admin.api";

import type { AccountType } from "@/types";

export const adminAllUsersQueryOptions = (
  page: number,
  itemPerPage: number
): UseQueryOptions<{ users: AccountType[]; totalPage: number }, Error> => ({
  queryKey: ["admin", "allusers", page],
  queryFn: () => adminFetchAllUsers(page, itemPerPage),
  staleTime: 5 * 60 * 1000,
});
