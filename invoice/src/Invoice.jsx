import jsPDF from "jspdf";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

const Invoice = ({data}) => {
  const invoicRef = useRef();

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.html(invoicRef.current, {
      callback: function (doc) {
        doc.save(`${data[0].itemName || "invoice"}.pdf`);
      },
      x: 10,
      y: 10,
      html2canvas: {
        scale:.3, 
        useCORS: true,
      },
    });
  };
  return (
    <>
      <div ref={invoicRef}>
        <p>invoice</p>
          {data.map((item, index)=>(
            <div key={index}>
              <p>Item name {item.itemName} </p>
              <p>Item name {item.itemPrice} </p>
            </div>
          ))}
      </div>
      <button onClick={handleDownload} >Download</button>
    </>
  );
};

export default Invoice;
