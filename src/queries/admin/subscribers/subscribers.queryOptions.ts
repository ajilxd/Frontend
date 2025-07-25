import type { UseQueryOptions } from "@tanstack/react-query";

import { adminFetchAllSubscribers } from "@/features/admin/api/admin.api";

import type { ISubscriber } from "@/types";

export const adminSubscriberQueryOptions = (
  page: number,
  itemPerPage: number,
  search: string,
  status: string
): UseQueryOptions<
  { subscribers: ISubscriber[]; totalPage: number },
  Error
> => ({
  queryKey: ["admin", "subscribers", { page, itemPerPage, search, status }],
  queryFn: () => adminFetchAllSubscribers(page, itemPerPage, search, status),
});
