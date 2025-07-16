import type { UseQueryOptions } from "@tanstack/react-query";

import { adminFetchAllUsers } from "@/features/admin/api/admin.api";

import type { AccountType } from "@/types";

export const adminAllUsersQueryOptions = (
  page: number,
  itemPerPage: number,
  search: string,
  role: string,
  status: string
): UseQueryOptions<{ users: AccountType[]; totalPage: number }, Error> => ({
  queryKey: ["admin", "allusers", { page, search, role, status }],
  queryFn: () => adminFetchAllUsers(page, itemPerPage, search, role, status),
  staleTime: 5 * 60 * 1000,
});
