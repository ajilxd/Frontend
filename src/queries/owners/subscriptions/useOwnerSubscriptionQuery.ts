import { useQuery } from "@tanstack/react-query";

import { ownerSubscriptionQueryOptions } from "./ownerSubscriptions.queryOptions";

export const useOwnerSubscriptionQuery = (ownerId: string) => {
  return useQuery(ownerSubscriptionQueryOptions(ownerId));
};
