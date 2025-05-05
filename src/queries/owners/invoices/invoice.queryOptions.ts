import type { UseQueryOptions } from "@tanstack/react-query";

import { ownerFetchInvoices } from "@/features/owner/api/owner.api";
import type { InvoiceType } from "@/types";

export const ownerInvoicesQueryOptions = (
  ownerId: string
): UseQueryOptions<InvoiceType[], Error> => ({
  queryKey: ["owner", "invoices", ownerId],
  queryFn: () => ownerFetchInvoices(ownerId),
  staleTime: 10 * 60 * 1000,
});
