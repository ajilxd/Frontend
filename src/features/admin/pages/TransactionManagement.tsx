import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "../utils";

import { useAdminTransactionsQuery } from "@/queries/admin/transactions/useTransactionQuery";
import { PaginationComponent } from "@/shared/components/Pagination";
import TransactionsMorePopOver from "../components/TransactionsMorePopOver";
import { debounce } from "@/utils/debounce";

const Transactions = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [page, setPage] = useState<number>(1);

  const memoisedPageUpdater = useCallback((page: number) => {
    setPage(page);
  }, []);

  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 1000),
    []
  );

  const handleStatusChange = useCallback((value: string) => {
    if (value === "all") {
      setStatus("");
    } else {
      setStatus(value);
    }
    setPage(1);
  }, []);

  const { data } = useAdminTransactionsQuery(page, 10, search, status);

  return (
    <div className="w-full space-y-4 dark:bg-gray-900">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl pt-10 pb-5">
            All Transactions
          </CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
              <Input
                placeholder="Search by customer, company, or subscription..."
                value={inputSearch}
                onChange={(e) => {
                  const value = e.target.value;
                  setInputSearch(value);
                  debouncedSetSearch(value);
                }}
                className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full sm:w-[180px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="all" className="dark:text-gray-100">
                  All
                </SelectItem>
                <SelectItem value="success" className="dark:text-gray-100">
                  Success Only
                </SelectItem>
                <SelectItem value="fail" className="dark:text-gray-100">
                  Failure Only
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {data?.transactions && data.transactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground dark:text-gray-400">
              <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>No transactions found for "{search}"</p>
              <p className="text-sm mt-1">
                Try searching by customer or company
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block h-[480px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Subscription</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.transactions?.map((tx, index) => (
                      <TableRow key={`${tx.customerId}-${index}`}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{tx.customerName}</TableCell>
                        <TableCell>{tx.companyName}</TableCell>
                        <TableCell>{tx.subscriptionName}</TableCell>
                        <TableCell>₹{tx.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              tx.status === "success"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {tx.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{tx.transactionType}</TableCell>
                        <TableCell>{formatDate("" + tx.createdAt)}</TableCell>
                        <TableCell>
                          <div className="flex flex-row justify-end pr-6">
                            <TransactionsMorePopOver transaction={tx} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="md:hidden space-y-4">
                {data?.transactions?.map((tx) => (
                  <Card
                    key={`${tx.customerId}-${tx.createdAt}`}
                    className="p-4 dark:bg-gray-800 dark:border-gray-700"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{tx.customerName}</p>
                          <p className="text-sm text-muted-foreground dark:text-gray-400">
                            {tx.companyName}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            tx.status === "success"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {tx.status}
                        </Badge>
                      </div>
                      <p className="text-sm">
                        Subscription: {tx.subscriptionName}
                      </p>
                      <p className="text-sm">Amount: ${tx.amount.toFixed(2)}</p>
                      <p className="text-sm">Type: {tx.transactionType}</p>
                      <p className="text-xs text-muted-foreground dark:text-gray-400">
                        Date: {formatDate("" + tx.createdAt)}
                      </p>
                      {tx.errorMessage && (
                        <p className="text-xs text-red-500">
                          Error: {tx.errorMessage}
                        </p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
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

export default Transactions;
