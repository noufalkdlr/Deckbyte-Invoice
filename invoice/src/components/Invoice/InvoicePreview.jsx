import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import InvoiceDoc from "./InvoiceDoc";
import ReceiptDoc from "./ReceiptDoc";

const InvoicePreview = ({
  data,
  billTo,
  invoiceDate,
  advancePaid,
  invoiceType,
  advanceAmount,
  finalPayment,
  invoiceNumber,
}) => {
  return (
    <>
      {invoiceType === "Invoice" && (
        <div className="w-screen h-[1200px]">
          <PDFViewer width="100%" height="100%">
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
          </PDFViewer>
        </div>
      )}
      {invoiceType === "Receipt" && (
        <div className="w-screen h-[1200px]">
          <PDFViewer width="100%" height="100%">
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
          </PDFViewer>
        </div>
      )}
    </>
  );
};

export default InvoicePreview;
