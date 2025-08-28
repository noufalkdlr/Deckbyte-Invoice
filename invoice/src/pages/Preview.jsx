import React from "react";
import { useLocation } from "react-router-dom";
import InvoicePreview from "../components/Invoice/InvoicePreview";
import DownloadInvoiceButton from "../components/DownloadInvoiceButton";
import { useNavigate } from "react-router-dom";

const Preview = () => {
  const navigate = useNavigate();

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

      <div className="py-24 flex justify-center">
        <div>
          <DownloadInvoiceButton
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
        <button
          onClick={() =>
            navigate("/", {
              state: {
                data,
                billTo,
                invoiceDate,
                advancePaid,
                invoiceType,
                advanceAmount,
                finalPayment,
                invoiceNumber,
              },
            })
          }
        >
          Back to edit
        </button>
      </div>
    </>
  );
};

export default Preview;
