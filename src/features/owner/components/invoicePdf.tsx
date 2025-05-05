import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import React from "react";

import { InvoiceType } from "@/types";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
    color: "#333333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A73E8",
  },
  companyInfo: {
    textAlign: "right",
    fontSize: 10,
    color: "#666666",
  },
  section: {
    backgroundColor: "#F9FAFB",
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1A73E8",
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    width: 120,
    fontWeight: "bold",
    color: "#444444",
  },
  value: {
    flex: 1,
    color: "#333333",
    wordBreak: "break-word",
  },
  totalRow: {
    flexDirection: "row",
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  totalLabel: {
    width: 120,
    fontWeight: "bold",
    fontSize: 12,
    color: "#1A73E8",
  },
  totalValue: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 12,
    color: "#1A73E8",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 9,
    color: "#666666",
  },
  paidTag: {
    fontSize: 10,
    color: "#34A853",
    fontWeight: "bold",
    alignSelf: "flex-start",
    backgroundColor: "#E6F4EA",
    padding: 4,
    borderRadius: 4,
    marginBottom: 10,
  },
  invoiceLink: {
    color: "#1A73E8",
    textDecoration: "underline",
    fontSize: 10,
    wordBreak: "break-word",
  },
});

type InvoiceProps = {
  invoice: InvoiceType;
};

const InvoicePDF: React.FC<InvoiceProps> = ({ invoice }) => {
  const formatDate = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const date = formatDate(+invoice.created);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>Fluentawork</Text>
          <View style={styles.companyInfo}>
            <Text>Fluentawork Inc.</Text>
            <Text>support@fluentawork.com</Text>
          </View>
        </View>

        <Text style={styles.paidTag}>PAID</Text>

        <View style={styles.section}>
          <Text style={styles.heading}>Invoice Summary</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Invoice ID:</Text>
            <Text style={styles.value}>{invoice.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Plan:</Text>
            <Text style={styles.value}>{invoice.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Customer Email:</Text>
            <Text style={styles.value}>{invoice.customer_email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Subscription ID:</Text>
            <Text style={styles.value}>{invoice.subscription_id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Created On:</Text>
            <Text style={styles.value}>{date}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>
              ${(invoice.total / 100).toFixed(2)}{" "}
              {invoice.currency.toUpperCase()}
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Thank you for your business! For support, contact
          support@invoicepro.com
        </Text>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
