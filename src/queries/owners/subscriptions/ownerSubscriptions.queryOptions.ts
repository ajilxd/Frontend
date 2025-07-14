import { ownerFetchOwnSubscription } from "@/features/owner/api/owner.api";
import { OwnerSubscriptionType } from "@/types";
import { UseQueryOptions } from "@tanstack/react-query";

export const ownerSubscriptionQueryOptions = (
  ownerId: string
): UseQueryOptions<OwnerSubscriptionType, Error> => ({
  queryKey: ["owner", "subscriptions", ownerId],
  queryFn: () => ownerFetchOwnSubscription(ownerId),
});
