import type { UseQueryOptions } from "@tanstack/react-query";

import { adminFetchOwners } from "@/features/admin/api/admin.api";

import type { OwnerType } from "@/types";

export const adminOwnerQueryOptions = (
  page: number
): UseQueryOptions<{ users: OwnerType[]; totalPage: number }, Error> => ({
  queryKey: ["admin", "owners", page],
  queryFn: () => adminFetchOwners(page, 10),
});
