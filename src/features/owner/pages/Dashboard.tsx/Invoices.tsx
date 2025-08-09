import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useInvoicesQuery } from "@/queries/owners/invoices/useInvoiceQuery";
import { RootState } from "@/redux/store/appStore";

import InvoicePDF from "../../components/invoicePdf";
import { PaginationComponent } from "@/shared/components/Pagination";

const Invoices: React.FC = () => {
  const Owner = useSelector((state: RootState) => state.owner);
  const [page, setPage] = useState(1);
  const memoisedPageUpdater = useCallback((page: number) => {
    setPage(page);
  }, []);

  const {
    data,
    isError: hasInvoiceError,
    isLoading: isInvoiceLoading,
  } = useInvoicesQuery("" + Owner._id, page);
  if (!data) return;
  const { invoices, totalPage } = data!;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-white mb-6">Invoices</h2>

      <div className="bg-background rounded-lg shadow-lg overflow-hidden">
        <div className="hidden md:block">
          <div className="h-[600px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-center">#</TableHead>
                  <TableHead className="min-w-[120px]">Invoice ID</TableHead>
                  <TableHead className="min-w-[200px]">Client Name</TableHead>
                  <TableHead className="min-w-[100px]">Date</TableHead>
                  <TableHead className="min-w-[100px] text-right">
                    Amount
                  </TableHead>
                  <TableHead className="min-w-[150px] text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isInvoiceLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500 mr-2"></div>
                        Loading...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : hasInvoiceError ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <p className="text-red-500 text-sm">
                        Error loading invoices. Please try again.
                      </p>
                    </TableCell>
                  </TableRow>
                ) : !invoices || invoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        No invoice data found
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  invoices.map((invoice, index) => (
                    <TableRow
                      key={invoice.invoiceId}
                      className="hover:bg-muted/50"
                    >
                      <TableCell className="text-center font-medium">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {invoice.invoiceId}
                      </TableCell>
                      <TableCell className="font-medium">
                        {invoice.customerEmail}
                      </TableCell>
                      <TableCell>
                        {new Date(invoice.createdAt).toDateString()}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ₹{(invoice.amount * 0.01).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        <PDFDownloadLink
                          document={<InvoicePDF invoice={invoice} />}
                          fileName={`invoice-${
                            new Date().toISOString().split("T")[0]
                          }.pdf`}
                          className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium border border-indigo-500 text-indigo-500 rounded-md hover:bg-indigo-500 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          {({ loading }) =>
                            loading ? (
                              <span className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                                Preparing...
                              </span>
                            ) : (
                              "Download PDF"
                            )
                          }
                        </PDFDownloadLink>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <PaginationComponent
            paginationHandler={memoisedPageUpdater}
            currentPage={page}
            totalPages={totalPage}
          />
        </div>

        <div className="md:hidden p-4">
          <div className="space-y-4">
            {isInvoiceLoading ? (
              <div className="text-center py-8">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500 mr-2"></div>
                  Loading...
                </div>
              </div>
            ) : hasInvoiceError ? (
              <div className="text-center py-8">
                <p className="text-red-500 text-sm">
                  Error loading invoices. Please try again.
                </p>
              </div>
            ) : !invoices || invoices.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No invoice data found
                </p>
              </div>
            ) : (
              invoices.map((invoice, index) => (
                <div
                  key={invoice.invoiceId}
                  className="bg-card border rounded-lg p-4 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500">#{index + 1}</p>
                      <p className="font-mono text-sm">{invoice.invoiceId}</p>
                    </div>
                    <p className="font-semibold">
                      ${(invoice.amount * 0.01).toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Client</p>
                    <p className="font-medium">{invoice.customerEmail}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p>{new Date(invoice.createdAt).toLocaleDateString()}</p>
                  </div>

                  <div className="pt-2">
                    <PDFDownloadLink
                      document={<InvoicePDF invoice={invoice} />}
                      fileName={`invoice-${invoice.invoiceId}-${
                        new Date().toISOString().split("T")[0]
                      }.pdf`}
                      className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-indigo-500 text-indigo-500 rounded-md hover:bg-indigo-500 hover:text-white transition-colors duration-200"
                    >
                      {({ loading }) =>
                        loading ? (
                          <span className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                            Preparing...
                          </span>
                        ) : (
                          "Download PDF"
                        )
                      }
                    </PDFDownloadLink>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
