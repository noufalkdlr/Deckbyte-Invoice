import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoiceDoc from "./Invoice/InvoiceDoc";
import ReceiptDoc from "./Invoice/ReceiptDoc";
import FinalInvoiceDoc from "./Invoice/FinalInvoiceDoc";
import FinalReceiptDoc from "./Invoice/FinalReceiptDoc";

export default function DownloadInvoiceButton({
  data,
  billTo,
  invoiceDate,
  advancePaid,
  invoiceType,
  advanceAmount,
  finalPayment,
  invoiceNumber,
}) {
  return (
    <PDFDownloadLink
document={
    invoiceType === "Invoice" ? (
      <InvoiceDoc
        data={data || []}
        billTo={billTo || {}}
        invoiceDate={invoiceDate}
        advancePaid={advancePaid}
        invoiceType={invoiceType}
        advanceAmount={advanceAmount}
        finalPayment={finalPayment}
        invoiceNumber={invoiceNumber}
      />
    ) : invoiceType === "Receipt" ? (
      <ReceiptDoc
        data={data || []}
        billTo={billTo || {}}
        invoiceDate={invoiceDate}
        advancePaid={advancePaid}
        invoiceType={invoiceType}
        advanceAmount={advanceAmount}
        finalPayment={finalPayment}
        invoiceNumber={invoiceNumber}
      />
    ) : invoiceType === "Final Invoice" ? (
      <FinalInvoiceDoc
        data={data || []}
        billTo={billTo || {}}
        invoiceDate={invoiceDate}
        advancePaid={advancePaid}
        invoiceType={invoiceType}
        advanceAmount={advanceAmount}
        finalPayment={finalPayment}
        invoiceNumber={invoiceNumber}
      />
    ) : invoiceType === "Final Receipt" ? (
      <FinalReceiptDoc
        data={data || []}
        billTo={billTo || {}}
        invoiceDate={invoiceDate}
        advancePaid={advancePaid}
        invoiceType={invoiceType}
        advanceAmount={advanceAmount}
        finalPayment={finalPayment}
        invoiceNumber={invoiceNumber}
      />
    ) : null
  }
      
      fileName={`${billTo.client || "INV"}_${invoiceDate || new Date().toLocaleDateString()}.pdf`}
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
