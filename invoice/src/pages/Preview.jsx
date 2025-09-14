import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import DownloadInvoiceButton from "../components/DownloadInvoiceButton";
import UploadInvoiceButton from "../components/UploadInvoiceButton";
import PreviewForReact from "../components/Invoice/PreviewForReact";
import InvoiceReceiptDesign from "../components/Invoice/InvoiceReceiptDesign";
import { pdf } from "@react-pdf/renderer";
import Navbar from "../components/Navbar";

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

  const [pdfBlob, setPdfBlob] = useState(null);

  const fileName = `${billTo?.client || "INV"}_${
    invoiceDate || new Date().toLocaleDateString()
  }.pdf`;

  // Generate PDF blob when invoice data changes
  useEffect(() => {
    if (state) {
      const generateBlob = async () => {
        const blob = await pdf(
          <InvoiceReceiptDesign
            data={data || []}
            billTo={billTo || {}}
            invoiceDate={invoiceDate}
            advancePaid={advancePaid}
            invoiceType={invoiceType}
            advanceAmount={advanceAmount}
            finalPayment={finalPayment}
            invoiceNumber={invoiceNumber}
          />
        ).toBlob();
        setPdfBlob(blob);
      };
      generateBlob();
    }
  }, [state]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center">
        {state ? (
          <PreviewForReact
            data={data || []}
            billTo={billTo || {}}
            invoiceDate={invoiceDate}
            advancePaid={advancePaid}
            invoiceType={invoiceType}
            advanceAmount={advanceAmount}
            finalPayment={finalPayment}
            invoiceNumber={invoiceNumber}
          />
        ) : (
          <p>No data passed</p>
        )}

        <div className="w-full sm:w-[700px] px-4 sm:px-0 pt-5 pb-10 flex flex-col justify-between  gap-3 sm:gap-6">
          <div className="flex justify-between w-full gap-3 ">
            {/* Back Button */}
            <Button
              variant="outlined"
              color="secondary"
              sx={{ height: "56px", whiteSpace: "nowrap", width: "100%" }}
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

            {/* Download Invoice Button */}
            <div className="w-full">
              {" "}
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
          </div>

          {/* Upload to Google Drive (only shows when pdf ready + logged in) */}
          <UploadInvoiceButton pdfBlob={pdfBlob} fileName={fileName} />
        </div>
      </div>
    </div>
  );
};

export default Preview;
