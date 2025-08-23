// DownloadInvoiceButton.jsx
import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoicePDF } from "./Invoice";

export default function DownloadInvoiceButton() {
  return (
    <PDFDownloadLink
      document={<InvoicePDF />}
      fileName="invoice.pdf"
      style={{
        textDecoration: "none",
        padding: "8px 12px",
        color: "#fff",
        backgroundColor: "#007bff",
        borderRadius: 4,
      }}
    >
      {({ blob, url, loading, error }) =>
        loading ? "Preparing PDF..." : "Download Invoice"
      }
    </PDFDownloadLink>
  );
}
