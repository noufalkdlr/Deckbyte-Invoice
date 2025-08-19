import { useState } from "react";
import jsPDF from "jspdf";
import { useRef } from "react";

const Invoice = ({
  data,
  billTo,
  invoiceDate,
  advancePaid,
  invoice,
  advanceAmount,
  finalPayment,
}) => {
  const firstInvoice = invoice === "Invoice";
  const firstReceipt = invoice === "Receipt";
  const finalInvoice = invoice === "Final Invoice";
  const finalReceipt = invoice === "Final Receipt";

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
        doc.save(`${billTo.client || "invoice"}${"- Invoice"}.pdf`);
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
      <div className="flex justify-center">
        <div
          ref={invoicRef}
          className="relative min-w-[1050px]  min-h-[1485px] px-[90px] pt-[100px] bg-white"
        >
          <div>
            <img
              src="data:image/png;base64,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"
              className="w-60"
            />
          </div>

          <div className="flex justify-between pt-6">
            <div>
              <h3 className="font-bold text-xl">DECKBYTE DIGITAL SOLUTIONS</h3>
              <p>Kodungallur, Thrissur, Kerala, India</p>
              <p className="font-bold text-base">
                +91 956 286 6814 | www.deckbyte.in
              </p>
            </div>
            <div className="text-right">
              <h1 className="font-bold text-4xl text-[#cd0d4e]">{firstInvoice || finalInvoice ? (<h2>Invoice</h2>) : 'Receipt'}</h1>
              <p className="mt-2">Invoice no: {invoiceNumber}</p>
              <p>
                Date:{" "}
                {invoiceDate ||
                  new Date().toLocaleDateString("en-GB").replaceAll("/", "-")}
              </p>
            </div>
          </div>
          <div className="pt-6">
            <h3 className="text-xl font-bold">BILL TO:</h3>
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
              <p className="text-xl font-bold">DESCRIPTION</p>
              <p className="text-center text-xl font-bold">QTY</p>
              <p className="text-center text-xl font-bold">PRICE</p>
              <p className="text-right text-xl font-bold">TOTAL</p>
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
              <div>
                <p>subtotal {totalAmount} </p>
                <p>Advance Amount {advanceAmount}</p>
                <div className="flex justify-end gap-8">
                  <span className="font-bold text-xl">BALANCE DUE </span>
                  <span className="font-bold text-xl">
                    <span className="text-base">₹</span>
                    {totalAmount - advanceAmount}{" "}
                  </span>
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
                  <span className="font-bold text-xl">BALANCE DUE </span>
                  <span className="font-bold text-xl">
                    <span className="text-base">₹</span>
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
                  <span className="font-bold text-xl">BALANCE DUE </span>
                  <span className="font-bold text-xl">
                    <span className="text-base">₹</span>
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
                  <span className="font-bold text-xl">BALANCE DUE </span>
                  <span className="font-bold text-xl">
                    <span className="text-base">₹</span>
                    {totalAmount - finalPayment-advancePaid}{" "}
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

      <button onClick={handleDownload}>Download</button>
    </>
  );
};

export default Invoice;
