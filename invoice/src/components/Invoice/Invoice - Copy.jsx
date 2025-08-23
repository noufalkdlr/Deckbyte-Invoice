import { useState } from "react";
import jsPDF from "jspdf";
import { useRef } from "react";



import { logo } from "../../assets/logo.js";

const Invoice = ({
  data,
  billTo,
  invoiceDate,
  advancePaid,
  invoiceType,
  advanceAmount,
  finalPayment,
}) => {
  const firstInvoice = invoiceType === "Invoice";
  const firstReceipt = invoiceType === "Receipt";
  const finalInvoice = invoiceType === "Final Invoice";
  const finalReceipt = invoiceType === "Final Receipt";

  const generateInvoiceNo = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear()).slice(-2);
    const randomPart = Math.floor(Math.random() * 90 + 10);

    return `INV-${day}${month}${year}-${randomPart}`;
  };

  const [invoiceNumber, setInvoiceNumber] = useState(generateInvoiceNo());

  const invoicRef = useRef();

  const handleDownload = () => {
    const doc = new jsPDF();


    doc.html(invoicRef.current, {
      callback: function (doc) {
        doc.save(
          `${billTo.client || "invoice"}-${new Date().toLocaleDateString()}.pdf`
        );
      },
      x: 0,
      y: 0,
      html2canvas: {
        scale: 0.2,
        useCORS: true,
      },
    });
  };

  const totalAmount = data.reduce(
    (acc, item) => acc + Number(item.itemPrice) * Number(item.itemQTY),
    0
  );

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex justify-center scale-100">
          <div
            ref={invoicRef}
            className="relative min-w-[1050px]  min-h-[1485px] px-[90px] pt-[100px] bg-white"
          >
            <div>
              <img src={logo} className="w-60" />
            </div>

            <div className="flex justify-between">
              <div>
                <h3 className="">
                  DECKBYTE DIGITAL SOLUTIONS
                </h3>
                <p className="">Kodungallur, Thrissur, Kerala, India</p>
                <p className="">+91 956 286 6814 | www.deckbyte.in</p>
              </div>
              <div className="text-right">
                <div>
                  {firstInvoice || finalInvoice ? (
                    <h2 className=" text-[#cd0d4e] ">INVOICE</h2>
                  ) : (
                    <h2 className=" text-[#cd0d4e] ">RECEIPT</h2>
                  )}
                </div>
                <p className="mt-2">Invoice no: {invoiceNumber}</p>
                <p>
                  Date:{" "}
                  {invoiceDate ||
                    new Date().toLocaleDateString("en-GB").replaceAll("/", "-")}
                </p>
              </div>
            </div>
            <div className="pt-6">
              <h3 className="  ">
                BILL TO:
              </h3>
              <p>{billTo.client || "Name"}</p>
              <p
                className="leading-3"
                dangerouslySetInnerHTML={{
                  __html: billTo.address.replace(/\n/g, "<br />"),
                }}
              />
              <p className="font-bold mt-1">{billTo.phone}</p>
            </div>

            <div className="pt-6">
              <div className="grid grid-cols-[5fr_1fr_1fr_1fr] pb-2.5">
                <p className="   ">
                  DESCRIPTION
                </p>
                <p className="text-center ">
                  QTY
                </p>
                <p className="text-center ">
                  PRICE
                </p>
                <p className="text-right ">
                  TOTAL
                </p>
              </div>
              <div className="border-y border-black my-2 pt-2 pb-6">
                {data.map((item, index) => (
                  <div key={index} className="grid grid-cols-[5fr_1fr_1fr_1fr]">
                    <p>{item.itemName} </p>
                    <p className="text-center">{item.itemQTY} </p>
                    <p className="text-center">{item.itemPrice} </p>
                    <p className="text-right">
                      {Number(item.itemPrice) * Number(item.itemQTY)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {firstInvoice ? (
                <div className="flex justify-end pt-4">
                  <div className=" flex flex-col gap-2 bg-neutral-300 w-60">
                    <div className="flex justify-between">
                      <span>subtotal</span>

                      <span>
                        <span>₹</span>
                        {totalAmount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Advance Amount </span>
                      <span>{advanceAmount}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="">BALANCE DUE</span>

                      <span>
                        <span className="">₹</span>
                        {totalAmount - advanceAmount}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {firstReceipt ? (
                <div>
                  <p>Total Invoice Amount {totalAmount} </p>
                  <p>Advance Received {advancePaid}</p>
                  <div className="flex justify-end gap-8">
                    <span className="">BALANCE DUE </span>
                    <span className="">
                      <span className="">₹</span>
                      {totalAmount - advancePaid}{" "}
                    </span>
                  </div>
                </div>
              ) : (
                ""
              )}
              {finalInvoice ? (
                <div>
                  <p>Total Invoice Amount {totalAmount} </p>
                  <p>Advance Paid {advancePaid}</p>
                  <div className="flex justify-end gap-8">
                    <span className="">BALANCE DUE </span>
                    <span className="">
                      <span className="">₹</span>
                      {totalAmount - advancePaid}{" "}
                    </span>
                  </div>
                </div>
              ) : (
                ""
              )}
              {finalReceipt ? (
                <div>
                  <p>Total Invoice Amount {totalAmount} </p>
                  <p>Advance Paid {advancePaid}</p>
                  <p>Final Payment Received{finalPayment}</p>
                  <div className="flex justify-end gap-8">
                    <span className="">BALANCE DUE </span>
                    <span className="">
                      <span className="">₹</span>
                      {totalAmount - finalPayment - advancePaid}{" "}
                    </span>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="absolute bottom-0 left-20 right-20">
              <div className="h-40 border-t border-black "></div>
            </div>
          </div>
        </div>

        <div className="py-8">
          <button
            className="bg-blue-600 text-white py-4 px-8"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      </div>
    </>
  );
};

export default Invoice;
