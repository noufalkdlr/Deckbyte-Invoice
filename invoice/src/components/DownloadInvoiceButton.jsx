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
