import React from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
// import InvoicePreview from "../components/Invoice/InvoicePreview";
import DownloadInvoiceButton from "../components/DownloadInvoiceButton";
import { useNavigate } from "react-router-dom";
// import { PDFViewer } from "@react-pdf/renderer";
import { BlobProvider } from "@react-pdf/renderer";

import InvoiceDoc from "../components/Invoice/InvoiceDoc";
import ReceiptDoc from "../components/Invoice/ReceiptDoc";
import FinalInvoiceDoc from "../components/Invoice/FinalInvoiceDoc";
import FinalReceiptDoc from "../components/Invoice/FinalReceiptDoc";

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
          {invoiceType === "Invoice" && (
            <div className="w-screen h-[1200px]">
              {/* <PDFViewer width="100%" height="100%">
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
              </PDFViewer> */}
              <BlobProvider
                document={
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
                }
              >
                {({ url }) =>
                  url ? (
                    <iframe
                      src={url}
                      className="w-full h-[1200px] border-0"
                      style={{ background: "white" }}
                    />
                  ) : (
                    <p>Loading preview...</p>
                  )
                }
              </BlobProvider>
            </div>
          )}
          {invoiceType === "Receipt" && (
            <div className="w-screen h-[1200px]">
              <BlobProvider
                document={
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
                }
              >
                {({ url }) =>
                  url ? (
                    <iframe
                      src={url}
                      className="w-full h-[1200px] border-0"
                      style={{ background: "white" }}
                    />
                  ) : (
                    <p>Loading preview...</p>
                  )
                }
              </BlobProvider>
            </div>
          )}
          {invoiceType === "Final Invoice" && (
            <div className="w-screen h-[1200px]">
              <BlobProvider
                document={
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
                }
              >
                {({ url }) =>
                  url ? (
                    <iframe
                      src={url}
                      className="w-full h-[1200px] border-0"
                      style={{ background: "white" }}
                    />
                  ) : (
                    <p>Loading preview...</p>
                  )
                }
              </BlobProvider>
            </div>
          )}
          {invoiceType === "Final Receipt" && (
            <div className="w-screen h-[1200px]">
              <BlobProvider
                document={
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
                }
              >
                {({ url }) =>
                  url ? (
                    <iframe
                      src={url}
                      className="w-full h-[1200px] border-0"
                      style={{ background: "white" }}
                    />
                  ) : (
                    <p>Loading preview...</p>
                  )
                }
              </BlobProvider>
            </div>
          )}
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
