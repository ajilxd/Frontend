import { useState, useMemo, useCallback } from "react";
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
import { formatDate } from "../utils";

import { useAdminTransactionsQuery } from "@/queries/admin/transactions/useTransactionQuery";
import { PaginationComponent } from "@/shared/components/Pagination";
import type { TransactionType } from "@/types";
import TransactionsMorePopOver from "../components/TransactionsMorePopOver";

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState<number>(1);

  const memoisedPageUpdater = useCallback((page: number) => {
    setPage(page);
  }, []);

  const { data, isFetched } = useAdminTransactionsQuery(page, 10);

  const filteredTransactions = useMemo(() => {
    if (!searchQuery.trim()) {
      return data?.transactions;
    }
    const query = searchQuery.toLowerCase().trim();
    return data?.transactions?.filter(
      (tx: TransactionType) =>
        tx.customerName.toLowerCase().includes(query) ||
        tx.companyName.toLowerCase().includes(query) ||
        tx.subscriptionName.toLowerCase().includes(query)
    );
  }, [searchQuery, data, isFetched]);

  return (
    <div className="w-full space-y-4 dark:bg-gray-900">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl pt-10 pb-5">
            All Transactions
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search by customer, company, or subscription..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredTransactions && filteredTransactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground dark:text-gray-400">
              <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>No transactions found for "{searchQuery}"</p>
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
                    {filteredTransactions?.map((tx, index) => (
                      <TableRow key={`${tx.customerId}-${index}`}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{tx.customerName}</TableCell>
                        <TableCell>{tx.companyName}</TableCell>
                        <TableCell>{tx.subscriptionName}</TableCell>
                        <TableCell>${tx.amount.toFixed(2)}</TableCell>
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
                {filteredTransactions?.map((tx) => (
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
