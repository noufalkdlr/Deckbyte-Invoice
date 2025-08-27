import React from "react";
import { useLocation } from "react-router-dom";
import InvoicePreview from "../components/Invoice/InvoicePreview";

const Preview = () => {
  const { state } = useLocation();
  const {
    data,
    billTo,
    invoiceDate,
    advancePaid,
    invoiceType,
    advanceAmount,
    finalPayment,
    invoiceNumber,
  } = state || {}; // fallback if state is undefined
  return (
    <>
      {state ? (
        <div>
          <InvoicePreview
            data={data || []}
            billTo={billTo || {}}
            invoiceDate={invoiceDate}
            advancePaid={advancePaid}
            invoiceType={invoiceType}
            advanceAmount={advanceAmount}
            finalPayment={finalPayment}
            invoiceNumber={invoiceNumber}
          />
        </div>
      ) : (
        <p>No data passed</p>
      )}
    </>
  );
};

export default Preview;
