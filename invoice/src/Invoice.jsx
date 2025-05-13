import jsPDF from "jspdf";
import { useRef } from "react";

const Invoice = ({ data, invoiceNo, billTo, invoiceDate }) => {
  const invoicRef = useRef();

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.html(invoicRef.current, {
      callback: function (doc) {
        doc.save(`${data[0].itemName || "invoice"}.pdf`);
      },
      x: 0,
      y: 0,
      html2canvas: {
        scale: 0.2,
        useCORS: true,
      },
    });
  };
  return (
    <>
      <div className="flex justify-center">
        <div
          ref={invoicRef}
          className="bg-slate-400 min-w-[1049px]  min-h-[1485px] px-16"
        >
            <p className="text-8xl">invoice</p>
            <p>invoic no: {invoiceNo}</p>
            <p>date:{invoiceDate}</p>

            <div>
              <p>{billTo.client}</p>
              <p>{billTo.address}</p>
              <p>{billTo.phone}</p>
            </div>
            {data.map((item, index) => (
              <div key={index}>
                <p>Item name {item.itemName} </p>
                <p>Item QTY {item.itemQTY} </p>
                <p>Item Price {item.itemPrice} </p>
                <p>Total: {Number(item.itemPrice) * Number(item.itemQTY)}</p>
              </div>
            ))}
            <p>
              Total Amount:{" "}
              {data.reduce(
                (acc, item) =>
                  acc + Number(item.itemPrice) * Number(item.itemQTY),
                0
              )}
            </p>
        </div>
      </div>

      <button onClick={handleDownload}>Download</button>
    </>
  );
};

export default Invoice;
