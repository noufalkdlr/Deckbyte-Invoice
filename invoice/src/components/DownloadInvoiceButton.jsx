import { PDFDownloadLink } from "@react-pdf/renderer";
import Button from "@mui/material/Button";
import InvoiceReceiptDesign from "./Invoice/InvoiceReceiptDesign";

export default function DownloadInvoiceButton(props) {
  return (
    <PDFDownloadLink
      document={<InvoiceReceiptDesign {...props} />}
      fileName={`${props.billTo.client || "INV"}_${
        props.invoiceDate || new Date().toLocaleDateString()
      }.pdf`}
      style={{ textDecoration: "none" }}
    >
      {({ loading }) => (
        <Button
          variant="contained"
          color="primary"
          sx={{ height: "56px", whiteSpace: "nowrap", width: "100%"  }}
        >
          {loading ? "Preparing PDF..." : "Download Invoice"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
