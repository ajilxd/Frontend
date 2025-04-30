import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { RootState } from "@/redux/store/appStore";

import { ownerFetchInvoices } from "../../api/owner.api";
import InvoicePDF from "../../components/invoicePdf";

type Invoice = {
  total: number;
  currency: string;
  hosted_invoice_url: string;
  invoice_pdf: string;
  customer_email: string;
  name: string;
  subscription_id: string;
  created: string;
  id: string;
};

const Invoices: React.FC = () => {
  const Owner = useSelector((state: RootState) => state.owner);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    async function fetchInvoicesRunner() {
      const response = await ownerFetchInvoices(Owner._id!);
      if (response.success) {
        console.log(response.data.data);
        setInvoices(response.data.data);
      } else {
        return console.warn("No invoices for owner");
      }
    }
    fetchInvoicesRunner();
  }, []);

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
              {invoices.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm p-5">
                  No invoice data found
                </p>
              ) : (
                invoices.map((invoice) => (
                  <TableRow key={invoice.created}>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice.customer_email}</TableCell>
                    <TableCell>{new Date().toLocaleDateString()}</TableCell>
                    <TableCell>${+invoice.total.toFixed(2) * 0.01}</TableCell>

                    <TableCell>
                      <PDFDownloadLink
                        document={<InvoicePDF invoice={invoice} />}
                        fileName="invoice.pdf"
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
