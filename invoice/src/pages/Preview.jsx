import React from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
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
  } = state || {};
  return (
    <div className="flex flex-col items-center ]">
      {state ? (
        <div className="w-full">
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

      <div className="py-24 flex justify-between w-fit gap-2 sm:gap-6">

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

        <Button
          variant="contained"
          color="success"
          sx={{
            height: "56px",
            whiteSpace: "nowrap",
          }}
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
          BACK TO EDIT
        </Button>
      </div>
    </div>
  );
};

export default Preview;
