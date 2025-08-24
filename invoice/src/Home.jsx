import React, { useEffect, useState } from "react";

import DownloadInvoiceButton from "./components/DownloadInvoiceButton.jsx";
import InvoicePreview from "./components/Invoice/InvoicePreview.jsx";

const Home = () => {
  const [data, setData] = useState([
    { itemName: "", itemQTY: "", itemPrice: "" },
  ]);
  const [invoiceDate, setInvoiceDate] = useState("");
  const [billTo, setBillTo] = useState({ client: "", address: "", phone: "" });
  const [advancePaid, setAdvancePaid] = useState("");
  const [advancePayment, setAdvancePayment] = useState("");
  const [invoiceType, setInvoiceType] = useState("");
  const [finalPayment, setFinalPayment] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const options = ["Invoice", "Receipt", "Final Invoice", "Final Receipt"];

  const generateInvoiceNo = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear()).slice(-2);
    const randomPart = Math.floor(Math.random() * 90 + 10);
    const invoiceNo = `INV-${day}${month}${year}-${randomPart}`;
    setInvoiceNumber(invoiceNo);
  };

  const handleDataChange = (index, e) => {
    const { name, value } = e.target;

    const updateData = [...data];
    updateData[index][name] = value;

    setData(updateData);
  };

  const hadleInvoiceDate = (e) => {
    const dateString = e.target.value;
    const formattedDate = new Date(dateString)
      .toLocaleDateString("en-GB")
      .replaceAll("/", "-");
    setInvoiceDate(formattedDate);
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

  const handleFinalPayment = (e) => {
    setFinalPayment(e.target.value);
  };

  useEffect(() => {
    generateInvoiceNo();
  }, []);

  return (
    <div className="bg-black flex flex-col items-center">
      <div className="flex flex-col py-24">
        <div className="mx-auto w-auto border-2 py-10 px-10 bg-white ">
          <div className="flex flex-col items-start gap-2">
            <label className="mr-2">Select Type:</label>
            <select
              className="border rounded p-2"
              value={invoiceType}
              onChange={(e) => setInvoiceType(e.target.value)}
            >
              <option value="">-- Select --</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            <div className="mt-4">
              {invoiceType && <p>You selected: {invoiceType}</p>}
            </div>
          </div>

          <form
            className="flex flex-col items-start gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="border px-3 py-2"
              type="date"
              name="invoiceDate"
              value={invoiceDate}
              onChange={hadleInvoiceDate}
            />

            <input
              className="border px-3 py-2"
              type="text"
              name="client"
              value={billTo.client}
              onChange={handleBillTo}
              placeholder="Client Name"
            />
            <input
              className="border px-3 py-2"
              type="text"
              name="phone"
              value={billTo.phone}
              onChange={handleBillTo}
              placeholder="Phone NO"
            />
            <textarea
              className="border px-3 py-2"
              name="address"
              value={billTo.address}
              onChange={handleBillTo}
              placeholder="Address"
              rows={3}
            />

            {data.map((item, index) => (
              <div className="flex gap-2" key={index}>
                <label>Item {index + 1}</label>
                <input
                  className="border px-3 py-2"
                  type="text"
                  name="itemName"
                  value={item.itemName}
                  onChange={(e) => handleDataChange(index, e)}
                  placeholder="Name"
                />
                <input
                  className="border px-3 py-2 w-28"
                  type="number"
                  name="itemQTY"
                  value={item.itemQTY}
                  onChange={(e) => handleDataChange(index, e)}
                  placeholder=" QTY"
                />
                <input
                  className="border px-3 py-2 w-28"
                  type="number"
                  name="itemPrice"
                  value={item.itemPrice}
                  onChange={(e) => handleDataChange(index, e)}
                  placeholder=" Price"
                />

                <button type="button" onClick={() => handleRemoveItem(index)}>
                  Remove Item
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddItem}>
              ➕ Add Item
            </button>

            {invoiceType === "Invoice" ? (
              <input
                className="border px-3 py-2 w-28"
                type="number"
                value={advancePayment}
                onChange={handleAdvancePayment}
                placeholder="Advance payment"
              />
            ) : (
              ""
            )}

            {invoiceType === "Final Invoice" ? (
              <input
                className="border px-3 py-2 w-28"
                type="number"
                value={advancePaid}
                onChange={handleAdvancePaid}
                placeholder="Advance paid amount"
              />
            ) : (
              ""
            )}

            {invoiceType === "Receipt" || invoiceType === "Final Receipt" ? (
              <>
                <input
                  className="border px-3 py-2 w-28"
                  type="number"
                  value={advancePaid}
                  onChange={handleAdvancePaid}
                  placeholder="Advance paid amount"
                />

                {invoiceType === "Final Receipt" ? (
                  <input
                    className="border px-3 py-2 w-28"
                    type="number"
                    value={finalPayment}
                    onChange={handleFinalPayment}
                    placeholder="Final Payment Received"
                  />
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
      <div className="py-24">
        <InvoicePreview
          data={data || []}
          billTo={billTo || {}}
          invoiceDate={invoiceDate}
          advancePaid={advancePaid}
          invoiceType={invoiceType}
          advanceAmount={advancePayment}
          finalPayment={finalPayment}
          invoiceNumber={invoiceNumber}
        />
      </div>

      {invoiceType === "Invoice" && (
        <div className="py-24">
          <DownloadInvoiceButton
            data={data || []}
            billTo={billTo || {}}
            invoiceDate={invoiceDate}
            advancePaid={advancePaid}
            invoiceType={invoiceType}
            advanceAmount={advancePayment}
            finalPayment={finalPayment}
            invoiceNumber={invoiceNumber}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
