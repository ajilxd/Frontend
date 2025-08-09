import type { UseQueryOptions } from "@tanstack/react-query";

import { ownerFetchInvoices } from "@/features/owner/api/owner.api";
import type { InvoiceType } from "@/types";

export const ownerInvoicesQueryOptions = (
  ownerId: string,
  page: number
): UseQueryOptions<{ invoices: InvoiceType[]; totalPage: number }, Error> => ({
  queryKey: ["owner", "invoices", ownerId],
  queryFn: () => ownerFetchInvoices(ownerId, page),
});
