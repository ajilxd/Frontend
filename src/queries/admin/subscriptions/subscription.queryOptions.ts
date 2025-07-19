import type { UseQueryOptions } from "@tanstack/react-query";

import { adminFetchSubscriptions } from "@/features/admin/api/admin.api";

import type { AdminSubscriptionType } from "@/types";

export const adminSubscripitonsQueryOptions = (
  page: number,
  itemPerPage: number,
  search: string,
  billingCycle: string,
  status: string
): UseQueryOptions<
  { subscriptions: AdminSubscriptionType[]; totalPage: number },
  Error
> => ({
  queryKey: ["admin", "subscriptions", { page, search, billingCycle, status }],
  queryFn: () =>
    adminFetchSubscriptions(page, itemPerPage, search, billingCycle, status),
});
