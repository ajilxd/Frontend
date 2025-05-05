import { useQuery } from "@tanstack/react-query";

import { ownerCompanyQueryOptions } from "./company.queryOptions";

export const useOwnerCompanyQuery = (ownerId: string) => {
  return useQuery(ownerCompanyQueryOptions(ownerId));
};
