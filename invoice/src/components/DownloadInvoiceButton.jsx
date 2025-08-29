import { PDFDownloadLink } from "@react-pdf/renderer";
import Button from "@mui/material/Button";
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

  const document =     invoiceType === "Invoice" ? (
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

  return (
    <PDFDownloadLink
document={document }

      fileName={`${billTo.client || "INV"}_${invoiceDate || new Date().toLocaleDateString()}.pdf`}
      style={{
        textDecoration: "none",
      }}
    >
      {({ blob, url, loading, error }) =>
          <Button
      variant="contained"
      color="primary"
      sx={{
        height: "56px",
        whiteSpace: "nowrap",
      }}
    >
      {loading ? "Preparing PDF..." : "Download Invoice"}
    </Button>

      }
    </PDFDownloadLink>
  );
}
