import type { UseQueryOptions } from "@tanstack/react-query";

import { adminFetchSalesReport } from "@/features/admin/api/admin.api";

import type { SalesReportResponse } from "@/types";

export const adminSalesReportQueryOptions = (): UseQueryOptions<
  SalesReportResponse,
  Error
> => ({
  queryKey: ["admin", "sales-report"],
  queryFn: () => adminFetchSalesReport(),
});
