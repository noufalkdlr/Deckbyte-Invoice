import React, { useEffect, useState } from "react";

import DownloadInvoiceButton from "../components/DownloadInvoiceButton.jsx";
import InvoicePreview from "../components/Invoice/InvoicePreview.jsx";

import { useLocation, useNavigate } from "react-router-dom";
import Preview from "./Preview.jsx";

const Home = () => {
  // const [data, setData] = useState([
  //   { itemName: "", itemQTY: "", itemPrice: "" },
  // ]);
  // const [invoiceDate, setInvoiceDate] = useState(() => {
  //   return new Date()
  //     .toLocaleDateString("en-GB")
  //     .replaceAll("/", "-");
  // });
  // const [rawDate, setRawDate] = useState(() => {
  //   return new Date().toISOString().split("T")[0];
  // });
  // const [billTo, setBillTo] = useState({ client: "", address: "", phone: "" });
  // const [advancePaid, setAdvancePaid] = useState("");
  // const [advancePayment, setAdvancePayment] = useState("");
  // const [invoiceType, setInvoiceType] = useState("");
  // const [finalPayment, setFinalPayment] = useState("");
  // const [invoiceNumber, setInvoiceNumber] = useState("");

  const { state } = useLocation();

  const [data, setData] = useState(
    state?.data || [{ itemName: "", itemQTY: "", itemPrice: "" }]
  );

  const [invoiceDate, setInvoiceDate] = useState(
    state?.invoiceDate ||
      new Date().toLocaleDateString("en-GB").replaceAll("/", "-")
  );

  const [rawDate, setRawDate] = useState(
    state?.invoiceDate
      ? new Date(state.invoiceDate.split("-").reverse().join("-"))
          .toISOString()
          .split("T")[0] // convert dd-mm-yyyy back to yyyy-mm-dd
      : new Date().toISOString().split("T")[0]
  );

  const [billTo, setBillTo] = useState(
    state?.billTo || { client: "", address: "", phone: "" }
  );

  const [advancePaid, setAdvancePaid] = useState(state?.advancePaid || "");
  const [advancePayment, setAdvancePayment] = useState(
    state?.advanceAmount || ""
  );
  const [invoiceType, setInvoiceType] = useState(state?.invoiceType || "");
  const [finalPayment, setFinalPayment] = useState(state?.finalPayment || "");
  const [invoiceNumber, setInvoiceNumber] = useState(
    state?.invoiceNumber || ""
  );

  const options = ["Invoice", "Receipt", "Final Invoice", "Final Receipt"];

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
    setData([...data, { itemName: "", itemPrice: "" }]);
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
        invoiceType,
        advanceAmount: advancePayment,
        finalPayment,
        invoiceNumber,
      },
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
    handlePreviewPage();
  };

  useEffect(() => {
    generateInvoiceNo();
  }, []);

  return (
    <div className="flex justify-center bg-[#E8E8E8] h-screen sm:py-24">
      <form
        className="bg-white h-screen sm:h-fit w-screen sm:w-[896px] px-4 sm:px-10 py-[62px] sm:pt-[62px] sm:pb-[57px] "
        onSubmit={handleForm}
      >
        <div className="">
          <div className="flex justify-between w-full sm:w-[50%]">
            <div className="">
              <select
                className="border p-2"
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
            </div>
            <input
              className="border px-3 py-2"
              type="date"
              name="invoiceDate"
              value={rawDate}
              onChange={handleInvoiceDate}
            />
          </div>

          <div className="flex flex-col  sm:flex-row sm:justify-between w-full">
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
          </div>

          <div>
            <textarea
              className="border px-3 py-2"
              name="address"
              value={billTo.address}
              onChange={handleBillTo}
              placeholder="Address"
              rows={3}
            />
          </div>

          {data.map((item, index) => (
            <div className="flex gap-2" key={index}>
              <div className="flex flex-col sm:flex-row w-full sm:justify-between">
                <div className="bg-green-200 flex flex-col">
                  <input
                    className="border px-3 py-2"
                    type="text"
                    name="itemName"
                    value={item.itemName}
                    onChange={(e) => handleData(index, e)}
                    placeholder="Name"
                  />
                </div>
                <div className="flex w-full sm:w-[50%] justify-between items-center">
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
                  <div>
                    <button
                      className="bg-red-600 text-white px-3 py-2"
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="h-px bg-black my-5 sm:hidden"></div>
          <div>
            <button
              className="bg-green-600 text-white px-3 py-2 w-full"
              type="button"
              onClick={handleAddItem}
            >
              Add Item
            </button>
          </div>

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
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <input
                className="border px-3 py-2"
                type="number"
                value={advancePaid}
                onChange={handleAdvancePaid}
                placeholder="Advance paid amount"
              />

              {invoiceType === "Final Receipt" ? (
                <input
                  className="border px-3 py-2"
                  type="number"
                  value={finalPayment}
                  onChange={handleFinalPayment}
                  placeholder="Final Payment Received"
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-2 w-full"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Home;
