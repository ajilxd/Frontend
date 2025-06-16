import { useQuery } from "@tanstack/react-query";

import { adminSubscripitonsQueryOptions } from "./subscription.queryOptions";

export const useSubscriptonsQuery = () => {
  return useQuery(adminSubscripitonsQueryOptions());
};
