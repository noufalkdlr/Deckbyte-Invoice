import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";

import InvoiceTypeSelect from "../components/Invoice/mui/InvoiceTypeSelect.jsx";
import DateSelect from "../components/Invoice/mui/DateSelect.jsx";
import NameSelect from "../components/Invoice/mui/NameSelect.jsx";
import PhoneNoSelect from "../components/Invoice/mui/PhoneNoSelect.jsx";
import AddressTextArea from "../components/Invoice/mui/AddressTextArea.jsx";
import ItemNameField from "../components/Invoice/mui/ItemNameField.jsx";
import QTYField from "../components/Invoice/mui/QTYField.jsx";
import PriceField from "../components/Invoice/mui/PriceField.jsx";
import RemoveButton from "../components/Invoice/mui/RemoveButton.jsx";
import AddItemButton from "../components/Invoice/mui/AddItemButton.jsx";
import SubmitButton from "../components/Invoice/mui/SubmitButton.jsx";
import DisabledField from "../components/Invoice/mui/DisabledField.jsx";
import PaymentField from "../components/Invoice/mui/PaymentField.jsx";

const Home = () => {
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

  const handleInvoiceDate = (dateString) => {
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
    setData([...data, { itemName: "", itemQuantity: "", itemPrice: "" }]);
    console.log(data);
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
<div className="flex flex-col ">
  <Navbar/>
      <div className="flex justify-center min-h-screen bg-white  sm:py-20">
      <form
        className="bg-white w-screen sm:h-fit  sm:w-[896px] px-4 sm:px-10 py-8 sm:pt-[62px] sm:pb-[57px] sm:rounded-md sm:border "
        onSubmit={handleForm}
      >
        <div className="flex flex-col gap-5 sm:gap-[26px]">
          <div className=" for_PC_View hidden sm:flex w-full gap-2 sm:gap-6">
            <div className="flex w-full gap-2 sm:gap-6">
              <div className="w-[50%]">
                <InvoiceTypeSelect
                  invoiceType={invoiceType}
                  setInvoiceType={setInvoiceType}
                  options={options}
                />
              </div>
              <div className="w-[50%]">
                <DateSelect
                  rawDate={rawDate}
                  handleInvoiceDate={handleInvoiceDate}
                />
              </div>
            </div>
            <div className=" w-full"></div>
          </div>
          <div className=" for_Mobile_View sm:hidden flex w-full gap-2 sm:gap-6">
            <div className="flex w-full gap-2 ">
              <div className="w-[50%]">
                <InvoiceTypeSelect
                  invoiceType={invoiceType}
                  setInvoiceType={setInvoiceType}
                  options={options}
                />
              </div>
              <div className="w-[50%]">
                <DateSelect
                  rawDate={rawDate}
                  handleInvoiceDate={handleInvoiceDate}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5  sm:gap-6  sm:flex-row sm:justify-between w-full">
            <div className="w-full">
              <NameSelect billTo={billTo} handleBillTo={handleBillTo} />
            </div>
            <div className="w-full">
              <PhoneNoSelect billTo={billTo} handleBillTo={handleBillTo} />
            </div>
          </div>

          <div className="">
            <AddressTextArea billTo={billTo} handleBillTo={handleBillTo} />
          </div>

          {data.map((item, index) => (
            <div
              key={index}
              className="w-full flex flex-col gap-5 sm:flex-row sm:justify-between sm:gap-6 sm:items-center"
            >
              <div className="w-full sm:w-[50%]">
                <ItemNameField
                  item={item}
                  handleData={handleData}
                  index={index}
                />
              </div>
              <div className="flex gap-2 sm:w-[50%] sm:gap-4 ">
                <div className="w-[70%]">
                  <QTYField item={item} handleData={handleData} index={index} />
                </div>
                <div className="w-full">
                  <PriceField
                    item={item}
                    handleData={handleData}
                    index={index}
                  />
                </div>

                <div>
                  <RemoveButton
                    index={index}
                    handleRemoveItem={handleRemoveItem}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="h-px bg-neutral-300 sm:hidden"></div>
          <div className="h-full">
            <AddItemButton handleAddItem={handleAddItem} />
          </div>

          {invoiceType === "Invoice" ? (
            <div className="flex gap-2 sm:gap-6">
              <div className="w-[50%]">
                <PaymentField
                  payment={advancePayment}
                  handleFunction={handleAdvancePayment}
                  label={"Advance Payment"}
                />
              </div>
              <div className="w-[50%]">
                <DisabledField />
              </div>
            </div>
          ) : (
            ""
          )}

          {invoiceType === "Final Invoice" ? (
            <div className="flex gap-2 sm:gap-6">
              <div className="w-[50%]">
                <PaymentField
                  payment={advancePaid}
                  handleFunction={handleAdvancePaid}
                  label={"Advance Paid"}
                />
              </div>
              <div className="w-[50%]">
                <DisabledField />
              </div>
            </div>
          ) : (
            ""
          )}

          {invoiceType === "Receipt" ? (
            <div className="flex gap-2 sm:gap-6">
              <div className="w-[50%]">
                <PaymentField
                  payment={advancePaid}
                  handleFunction={handleAdvancePaid}
                  label={"Advance Paid"}
                />
              </div>
              <div className="w-[50%]">
                <DisabledField />
              </div>
            </div>
          ) : (
            ""
          )}
          {invoiceType === "Final Receipt" ? (
            <div className="flex gap-2 sm:gap-6">
              <div className="w-[50%]">
                <PaymentField
                  payment={advancePaid}
                  handleFunction={handleAdvancePaid}
                  label={"Advance Paid"}
                />
              </div>
              <div className="w-[50%]">
                <PaymentField
                  payment={finalPayment}
                  handleFunction={handleFinalPayment}
                  label={"Final Payment Received"}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <div>
            <SubmitButton />
          </div>
        </div>
      </form>
    </div>
</div>
  );
};

export default Home;
