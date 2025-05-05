import { useQuery } from "@tanstack/react-query";

import { ownerSubscriptionQueryOptions } from "./subscriptions.queryOptions";

export const useOwnerSubscriptionQuery = (ownerId: string) => {
  return useQuery(ownerSubscriptionQueryOptions(ownerId));
};
