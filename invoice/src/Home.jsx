import React, { use, useState } from "react";
import Invoice from "./Invoice";

const Home = () => {
  const [data, setData] = useState([
    { itemName: "", itemQTY: "", itemPrice: "" },
  ]);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [billTo, setBillTo] = useState({ client: "", address: "", phone: "" });
  const [advancePaid, setAdvancePaid] = useState("");
  const [advancePayment, setAdvancePayment] = useState("");
  const [invoice, setInvoice] = useState("");
  const [finalPayment, setFinalPayment] = useState("");

  const handleDataChange = (index, e) => {
    const { name, value } = e.target;

    const updateData = [...data];
    updateData[index][name] = value;

    setData(updateData);
  };

  const hadleInvoiceDate = (e) => {
    setInvoiceDate(e.target.value);
  };

  const handleBillTo = (e) => {
    const { name, value } = e.target;

    setBillTo({ ...billTo, [name]: value });
  };

  const handleAddItem = () => {
    setData([...data, { itemName: "", itemPrice: "" }]);
  };

  const handleRemoveItem = (index) => {
    if (data.length > 1) {
      const updateData = data.filter((_, i) => i !== index);
      setData(updateData);
    }
  };

  const handleAdvancePaid = (e) => {
    setAdvancePaid(e.target.value);
  };

  const handleAdvancePayment = (e) => {
    setAdvancePayment(e.target.value);
  };

  const handleFinalPayment = (e)=>{
    setFinalPayment(e.target.value)
  }

  return (
    <>
      <div className="flex flex-col justify-center mx-auto py-10 w-[50%]">
        <div>
          <button
            className={`px-4 py-2 border-2 border-black ${
              invoice === "Invoice" ? "bg-slate-400" : ""
            }`}
            onClick={() => setInvoice("Invoice")}
          >
            Invoice
          </button>
          <button
            className={`px-4 py-2 border-2 border-black ${
              invoice === "Receipt" ? "bg-slate-400" : ""
            }`}
            onClick={() => setInvoice("Receipt")}
          >
            Receipt
          </button>
          <button
            className={`px-4 py-2 border-2 border-black ${
              invoice === "Final Invoice" ? "bg-slate-400" : ""
            }`}
            onClick={() => setInvoice("Final Invoice")}
          >
            Final Invoice
          </button>
          <button
            className={`px-4 py-2 border-2 border-black ${
              invoice === "Final Receipt" ? "bg-slate-400" : ""
            }`}
            onClick={() => setInvoice("Final Receipt")}
          >
            Final Receipt
          </button>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="client"
            value={billTo.client}
            onChange={handleBillTo}
            placeholder="Client Name"
          />
          <input
            type="date"
            name="invoiceDate"
            value={invoiceDate}
            onChange={hadleInvoiceDate}
          />
          <textarea
            name="address"
            value={billTo.address}
            onChange={handleBillTo}
            placeholder="Address"
            rows={3}
          />
          <input
            type="text"
            name="phone"
            value={billTo.phone}
            onChange={handleBillTo}
            placeholder="Phone NO"
          />
          {data.map((item, index) => (
            <div key={index}>
              <label>Item {index + 1}</label>
              <input
                type="text"
                name="itemName"
                value={item.itemName}
                onChange={(e) => handleDataChange(index, e)}
                placeholder="Name"
              />
              <input
                type="number"
                name="itemQTY"
                value={item.itemQTY}
                onChange={(e) => handleDataChange(index, e)}
                placeholder=" QTY"
              />
              <input
                type="number"
                name="itemPrice"
                value={item.itemPrice}
                onChange={(e) => handleDataChange(index, e)}
                placeholder=" Price"
              />

              <button type="button" onClick={() => handleRemoveItem(index)}>
                Remov Item
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddItem}>
            ➕ Add Item
          </button>

          {invoice === "Invoice" || invoice === "Final Invoice" ? (
            <input
              type="number"
              value={advancePayment}
              onChange={handleAdvancePayment}
              placeholder="Advance Payment"
            />
          ) : (
            ""
          )}

          {invoice === "Receipt" || invoice === "Final Receipt" ? (
            <>
            <input
              type="number"
              value={advancePaid}
              onChange={handleAdvancePaid}
              placeholder="Advance paid amount"
            />

            {invoice === "Final Receipt" ? (
              <input
              type="number"
              value={finalPayment}
              onChange={handleFinalPayment}
              placeholder="Final Payment Received"
            />
            ):''}

            </>
            
          ) : (
            ""
          )}
        </form>
      </div>
      <Invoice
        data={data}
        invoiceNo={invoiceNo}
        billTo={billTo}
        invoiceDate={invoiceDate}
        advancePaid={advancePaid}
        invoice={invoice}
        advanceAmount={advancePayment}
        finalPayment={finalPayment}
      />
    </>
  );
};

export default Home;
