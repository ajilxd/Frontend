import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
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

const Invoices: React.FC = () => {
  const Owner = useSelector((state: RootState) => state.owner);

  const {
    data: invoices,
    isError: hasInvoiceError,
    error: invoiceError,
    isLoading: isInvoiceLoading,
  } = useInvoicesQuery("" + Owner._id);
  if (invoiceError) {
    console.error(invoiceError);
  }
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-white mb-6">Invoices</h2>
      <div className="bg-background rounded-lg shadow-lg overflow-hidden">
        {/* Desktop View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>

                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isInvoiceLoading && <p>Loading ...</p>}
              {!hasInvoiceError && invoices?.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm p-5">
                  No invoice data found
                </p>
              ) : (
                !hasInvoiceError &&
                invoices?.map((invoice) => (
                  <TableRow key={invoice.created}>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice.customer_email}</TableCell>
                    <TableCell>{new Date().toLocaleDateString()}</TableCell>
                    <TableCell>${+invoice.total.toFixed(2) * 0.01}</TableCell>

                    <TableCell>
                      <PDFDownloadLink
                        document={<InvoicePDF invoice={invoice} />}
                        fileName={new Date() + "invoice.pdf"}
                        className="border border-indigo-500 text-indigo-500 rounded hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 transition-colors p-2 "
                      >
                        {({ loading }) =>
                          loading ? "Preparing PDF..." : "Download Invoice"
                        }
                      </PDFDownloadLink>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
