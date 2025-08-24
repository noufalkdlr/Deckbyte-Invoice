import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoiceDoc from "./Invoice/InvoiceDoc";

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
      document={<InvoiceDoc 
        data={data || []}
        billTo={billTo || {}}
        invoiceDate={invoiceDate}
        advancePaid={advancePaid}
        invoiceType={invoiceType}
        advanceAmount={advanceAmount}
        finalPayment={finalPayment}
        invoiceNumber={invoiceNumber}
      
      />}
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