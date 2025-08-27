import React, { useEffect, useState } from "react";

import DownloadInvoiceButton from "../components/DownloadInvoiceButton.jsx";
import InvoicePreview from "../components/Invoice/InvoicePreview.jsx";

import { useNavigate } from "react-router-dom";
import Preview from "./Preview.jsx";

const Home = () => {
  const [data, setData] = useState([
    { itemName: "", itemQTY: "", itemPrice: "" },
  ]);
  const [invoiceDate, setInvoiceDate] = useState(() => {
    return new Date()
      .toLocaleDateString("en-GB")
      .replaceAll("/", "-");
  });
  const [rawDate, setRawDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [billTo, setBillTo] = useState({ client: "", address: "", phone: "" });
  const [advancePaid, setAdvancePaid] = useState("");
  const [advancePayment, setAdvancePayment] = useState("");
  const [invoiceType, setInvoiceType] = useState("");
  const [finalPayment, setFinalPayment] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const options = ["Invoice", "Receipt", "Final Invoice", "Final Receipt"];

  const [tempInvoiceType, setTempInvoiceType] = useState("");

  const navigate = useNavigate();

  const generateInvoiceNo = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear()).slice(-2);
    const randomPart = Math.floor(Math.random() * 90 + 10);
    const invoiceNo = `INV-${day}${month}${year}-${randomPart}`;
    setInvoiceNumber(invoiceNo);
  };

  const handleData = (index, e) => {
    const { name, value } = e.target;

    const updateData = [...data];
    updateData[index][name] = value;
    setData(updateData);
  };

  const handleInvoiceDate = (e) => {
    const dateString = e.target.value;
    setRawDate(dateString);
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
    setTempData([...tempData, { itemName: "", itemPrice: "" }]);
  };

  const handleRemoveItem = (index) => {
    if (tempData.length > 1) {
      const updateData = tempData.filter((_, i) => i !== index);
      setTempData(updateData);
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

  const handlePreviewPage = () => {
    navigate("/preview", {
      state: {
        data,
        billTo,
        invoiceDate,
        advancePaid,
        invoiceType:tempInvoiceType,
        advanceAmount: advancePayment,
        finalPayment,
        invoiceNumber,
      },
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
    setInvoiceType(tempInvoiceType);
    handlePreviewPage();
  };

  useEffect(() => {
    generateInvoiceNo();
  }, []);

  return (
    <div className="bg-[#e8e8e8] flex flex-col items-center">
      <div className="flex flex-col justify-center h-screen">
        <div className="mx-auto w-auto border-2 py-10 px-10 bg-white ">
          <form
            className="flex flex-col items-start gap-2"
            onSubmit={handleForm}
          >
            <div className="flex flex-col items-start gap-2">
              <select
                className="border rounded p-2"
                value={tempInvoiceType}
                onChange={(e) => setTempInvoiceType(e.target.value)}
              >
                <option value="">-- Select --</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <input
              className="border px-3 py-2"
              type="date"
              name="invoiceDate"
              value={rawDate}
              onChange={handleInvoiceDate}
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
                  onChange={(e) => handleData(index, e)}
                  placeholder="Name"
                />
                <input
                  className="border px-3 py-2 w-28"
                  type="number"
                  name="itemQTY"
                  value={item.itemQTY}
                  onChange={(e) => handleData(index, e)}
                  placeholder=" QTY"
                />
                <input
                  className="border px-3 py-2 w-28"
                  type="number"
                  name="itemPrice"
                  value={item.itemPrice}
                  onChange={(e) => handleData(index, e)}
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

            {tempInvoiceType === "Invoice" ? (
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

            {tempInvoiceType === "Final Invoice" ? (
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

            {tempInvoiceType === "Receipt" ||
            tempInvoiceType === "Final Receipt" ? (
              <>
                <input
                  className="border px-3 py-2 w-28"
                  type="number"
                  value={advancePaid}
                  onChange={handleAdvancePaid}
                  placeholder="Advance paid amount"
                />

                {tempInvoiceType === "Final Receipt" ? (
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

            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="">
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
    </div>
  );
};

export default Home;
