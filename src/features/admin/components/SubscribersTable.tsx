import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useSubscriberQuery } from "@/queries/admin/subscribers/useSubscriberQuery";
import { PaginationComponent } from "@/shared/components/Pagination";
import { debounce } from "@/utils/debounce";
import { Search } from "lucide-react";
import { useCallback, useState } from "react";

const SubscribersTable = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [keystroke, setKeystroke] = useState("");
  const [status, setStatus] = useState("");

  const { data } = useSubscriberQuery(page, 10, search, status);

  const memoisedPageUpdater = useCallback((page: number) => {
    setPage(page);
  }, []);

  const debouncedSetSearch = useCallback(
    debounce((value) => setSearch(value), 500),
    []
  );

  const handleStatusChange = useCallback((value: string) => {
    setStatus(value === "all" ? "" : value);
    setPage(1);
  }, []);

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            placeholder="Search by plan name..."
            value={keystroke}
            onChange={(e) => {
              const value = e.target.value;
              setKeystroke(value);
              debouncedSetSearch(value);
            }}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="w-full sm:w-36 px-3 py-2 border border-input rounded-md bg-background text-foreground"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table Card */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto" style={{ height: "480px" }}>
            <table className="min-w-full text-left text-sm">
              <thead className="sticky top-0 bg-background">
                <tr>
                  <th className="px-4 py-2">Index</th>
                  <th className="px-4 py-2">Customer</th>
                  <th className="px-4 py-2">Company</th>
                  <th className="px-4 py-2">Subscription</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Next Payment</th>
                </tr>
              </thead>
              <tbody>
                {data?.subscribers?.length ? (
                  data.subscribers.map((row, index) => (
                    <tr key={row._id} className="border-b">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{row.customerName}</td>
                      <td className="px-4 py-2">{row.company}</td>
                      <td className="px-4 py-2">{row.name}</td>
                      <td className="px-4 py-2">{row.status}</td>
                      <td className="px-4 py-2">{row.amount}</td>
                      <td className="px-4 py-2">
                        {new Date(row.expiresAt).toDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No subscribers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <PaginationComponent
        paginationHandler={memoisedPageUpdater}
        currentPage={page}
        totalPages={data?.totalPage ?? 1}
      />
    </div>
  );
};

export default SubscribersTable;
