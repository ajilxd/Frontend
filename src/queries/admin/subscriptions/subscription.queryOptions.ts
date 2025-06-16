import type { UseQueryOptions } from "@tanstack/react-query";

import { adminFetchSubscriptions } from "@/features/admin/api/admin.api";

import type { SubscriptionType } from "@/types";

export const adminSubscripitonsQueryOptions = (): UseQueryOptions<
  SubscriptionType[],
  Error
> => ({
  queryKey: ["admin", "subscriptions"],
  queryFn: () => adminFetchSubscriptions(),
});
