import React from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import DownloadInvoiceButton from "../components/DownloadInvoiceButton";
import { useNavigate } from "react-router-dom";
import { BlobProvider } from "@react-pdf/renderer";

import InvoiceReceiptDesign from "../components/Invoice/InvoiceReceiptDesign";
import PreviewForReact from "../components/Invoice/PreviewForReact";

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
    <div className="flex flex-col items-center ">
      {state ? (
        // <div className="w-full">
        //   <div className="w-screen h-[1200px]">
        //     <BlobProvider
        //       document={
        //         <InvoiceReceiptDesign
        //           data={data || []}
        //           billTo={billTo || {}}
        //           invoiceDate={invoiceDate}
        //           advancePaid={advancePaid}
        //           invoiceType={invoiceType}
        //           advanceAmount={advanceAmount}
        //           finalPayment={finalPayment}
        //           invoiceNumber={invoiceNumber}
        //         />
        //       }
        //     >
        //       {({ url }) =>
        //         url ? (
        //           <iframe
        //             src={url}
        //             className="w-full h-[1200px] border-0"
        //             style={{ background: "white" }}
        //           />
        //         ) : (
        //           <p>Loading preview...</p>
        //         )
        //       }
        //     </BlobProvider>
        //   </div>
        // </div>
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

      <div className=" pt-5 pb-10 flex justify-between w-fit gap-2 sm:gap-6">
        <Button
  variant="outlined" 
  color="secondary" 
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
  );
};

export default Preview;
