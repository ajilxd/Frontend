import { useQuery } from "@tanstack/react-query";

import { subscriptionsQueryOptions } from "./subscriptions.queryOptions";

export const useSubscriptionsQuery = () => {
  return useQuery(subscriptionsQueryOptions());
};
