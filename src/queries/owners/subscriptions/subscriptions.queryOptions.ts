import type { UseQueryOptions } from "@tanstack/react-query";

import {
  ownerFetchSubscriptions,
  ownerFetchOwnSubscription,
} from "@/features/owner/api/owner.api";
import type { OwnerSubscriptionType, SubscriptionType } from "@/types";

export const ownerSubscriptionsQueryOptions = (): UseQueryOptions<
  SubscriptionType[],
  Error
> => ({
  queryKey: ["owner", "subscriptions"],
  queryFn: () => ownerFetchSubscriptions(),
});

export const ownerSubscriptionQueryOptions = (
  ownerId: string
): UseQueryOptions<OwnerSubscriptionType, Error> => ({
  queryKey: ["owner", "subscriptions", ownerId],
  queryFn: () => ownerFetchOwnSubscription(ownerId),
});
