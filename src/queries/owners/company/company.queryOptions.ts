import type { UseQueryOptions } from "@tanstack/react-query";

import { ownerFetchCompany } from "@/features/owner/api/owner.api";
import type { CompanyType } from "@/types";

export const ownerCompanyQueryOptions = (
  ownerId: string
): UseQueryOptions<CompanyType, Error> => ({
  queryKey: ["owner", "company", ownerId],
  queryFn: () => ownerFetchCompany(ownerId),
});
