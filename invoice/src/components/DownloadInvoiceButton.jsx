import { PDFDownloadLink } from "@react-pdf/renderer";
import Button from "@mui/material/Button";
import InvoiceDoc from "./Invoice/InvoiceDoc";
import ReceiptDoc from "./Invoice/ReceiptDoc";
import FinalInvoiceDoc from "./Invoice/FinalInvoiceDoc";
import FinalReceiptDoc from "./Invoice/FinalReceiptDoc";

export default function DownloadInvoiceButton(props) {
  const { invoiceType } = props;

  const document =
    invoiceType === "Invoice" ? (
      <InvoiceDoc {...props} />
    ) : invoiceType === "Receipt" ? (
      <ReceiptDoc {...props} />
    ) : invoiceType === "Final Invoice" ? (
      <FinalInvoiceDoc {...props} />
    ) : invoiceType === "Final Receipt" ? (
      <FinalReceiptDoc {...props} />
    ) : null;

  return (
    <PDFDownloadLink
      document={document}
      fileName={`${props.billTo.client || "INV"}_${
        props.invoiceDate || new Date().toLocaleDateString()
      }.pdf`}
      style={{
        textDecoration: "none",
      }}
    >
      {({ blob, url, loading, error }) => (
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
      )}
    </PDFDownloadLink>
  );
}
