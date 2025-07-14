import type { UseQueryOptions } from "@tanstack/react-query";

import { ownerFetchSubscriptions } from "@/features/owner/api/owner.api";
import type { SubscriptionType } from "@/types";

export const subscriptionsQueryOptions = (): UseQueryOptions<
  SubscriptionType[],
  Error
> => ({
  queryKey: ["owner", "subscriptions"],
  queryFn: () => ownerFetchSubscriptions(),
});
