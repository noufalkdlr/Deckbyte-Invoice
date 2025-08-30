import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import InvoiceDoc from "./InvoiceDoc";
import ReceiptDoc from "./ReceiptDoc";
import FinalInvoiceDoc from "./FinalInvoiceDoc";
import FinalReceiptDoc from "./FinalReceiptDoc";

const InvoicePreview = ({invoiceType ,...props}) => {
  return (
    <>
      {invoiceType === "Invoice" && (
        <div className="w-screen h-[1200px]">
          <PDFViewer width="100%" height="100%">
            <InvoiceDoc {...props} />
          </PDFViewer>
        </div>
      )}
      {invoiceType === "Receipt" && (
        <div className="w-screen h-[1200px]">
          <PDFViewer width="100%" height="100%">
            <ReceiptDoc {...props} />
          </PDFViewer>
        </div>
      )}
      {invoiceType === "Final Invoice" && (
        <div className="w-screen h-[1200px]">
          <PDFViewer width="100%" height="100%">
            <FinalInvoiceDoc {...props} />
          </PDFViewer>
        </div>
      )}
      {invoiceType === "Final Receipt" && (
        <div className="w-screen h-[1200px]">
          <PDFViewer width="100%" height="100%">
            <FinalReceiptDoc {...props} />
          </PDFViewer>
        </div>
      )}
    </>
  );
};

export default InvoicePreview;
