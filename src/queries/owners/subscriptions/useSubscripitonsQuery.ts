import { useQuery } from "@tanstack/react-query";

import { ownerSubscriptionsQueryOptions } from "./subscriptions.queryOptions";

export const useSubscriptionsQuery = () => {
  return useQuery(ownerSubscriptionsQueryOptions());
};
