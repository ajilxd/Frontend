import { useQuery } from "@tanstack/react-query";
import { adminSalesReportQueryOptions } from "./salesReport.queryOptions";

export const useSalesReportQuery = () => {
  return useQuery(adminSalesReportQueryOptions());
};
