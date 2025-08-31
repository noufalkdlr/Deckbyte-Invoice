import React from "react";
import logo from "../../assets/DeckbyteLogo.png";

const PreviewForReact = ({
  data,
  billTo,
  invoiceDate,
  advancePaid,
  invoiceType,
  advanceAmount,
  finalPayment,
  invoiceNumber,
}) => {
  const invoiceTypeName = () => {
    switch (invoiceType) {
      case "Invoice":
        return "INVOICE";
      case "Receipt":
        return "RECEIPT";
      case "Final Invoice":
        return "INVOICE";
      case "Final Receipt":
        return "RECEIPT";
      default:
        return null;
    }
  };

  const totalAmount = (data || []).reduce(
    (acc, item) => acc + Number(item.itemPrice) * Number(item.itemQTY),
    0
  );

  return (
    <div className=" w-screen flex justify-center px-4 py-8 sm:py-16  ">
      <div className=" w-screen flex flex-col gap-6 sm:gap-8 sm:w-[700px]  bg-white  ">
        {/* {------------------- Client Details ---------------------} */}

        <div className="flex w-full">
          <div className="flex flex-col w-full">
            <div className="flex w-full">
              <p className="w-[50%] py-4 px-4 sm:px-8 sm:py-6 border font-worksans text-neutral-700 ">
                Client Name
              </p>
              <p className="w-[50%] py-4 px-4 sm:px-8 sm:py-6 border border-l-0 font-worksans text-neutral-700 ">
                {billTo.client}
              </p>
            </div>
            <div className="flex w-full">
              <p className="w-[50%] py-4 px-4 sm:px-8 sm:py-6 border border-t-0  font-worksans text-neutral-700 ">
                Phone Number
              </p>
              <p className="w-[50%] py-4 px-4 sm:px-8 sm:py-6 border border-t-0  border-l-0 font-worksans text-neutral-700 ">
                {billTo.phone}
              </p>
            </div>
            <div className="flex w-full">
              <p className="w-[50%] py-4 px-4 sm:px-8 sm:py-6 border border-t-0  ont-worksans text-neutral-700 ">
                Address
              </p>
              <p className="w-[50%] py-4 px-4 sm:px-8 sm:py-6 border border-t-0 border-l-0 font-worksans text-neutral-700 ">
                {billTo.address}
              </p>
            </div>
          </div>
        </div>

        {/* {------------------- Client Details END ---------------------} */}

        {/* {------------------- Item Name, QTY, Price ---------------------} */}

        <div className="flex w-full">
          <div className="flex flex-col w-full">
            <div className="flex w-full">
              <p className="w-[50%] py-4 px-4 sm:px-8 sm:py-6 border font-worksans font-semibold ">
                Item Name
              </p>
              <p className="w-[20%] py-4 px-4 sm:px-8 sm:py-6 border border-l-0 font-worksans font-semibold ">
                QTY
              </p>
              <p className="w-[30%] py-4 px-4 sm:px-8 sm:py-6 border border-l-0 font-worksans font-semibold ">
                Price
              </p>
            </div>
            {data.map((item, index) => (
              <div key={index} className="flex w-full">
                <p className="w-[50%] py-4 px-4 sm:px-8 sm:py-6 border border-t-0 font-worksans text-neutral-700 ">
                  {item.itemName}
                </p>
                <p className="w-[20%] py-4 px-4 sm:px-8 sm:py-6 border border-t-0 border-l-0 font-worksans text-neutral-700 ">
                  {item.itemQTY}
                </p>
                <p className="w-[30%] py-4 px-4 sm:px-8 sm:py-6 border border-t-0 border-l-0 font-worksans text-neutral-700 ">
                  {item.itemPrice}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* {------------------- Item Name, QTY, Price END ---------------------} */}

        {/* {------------------- Payment ---------------------} */}

        {invoiceType === "Invoice" ? (
          <div className="flex w-full">
            <p className="w-[50%] py-4 px-4 sm:px-8 sm:py-6 border font-worksans text-neutral-700 ">
              Advance Amount
            </p>
            <p className="w-[50%] py-4 px-4 sm:px-8 sm:py-6 border border-l-0 font-worksans text-neutral-700 ">
              {advanceAmount}
            </p>
          </div>
        ) : invoiceType === "Receipt" ? (
          <div className="flex w-full">
            <p className="w-[50%] py-4 px-4 sm:px-8 sm:py-6 border font-worksans text-neutral-700 ">
              Advance Paid
            </p>
            <p className="w-[50%] py-4 px-4 sm:px-8 sm:py-6 border border-l-0 font-worksans text-neutral-700 ">
              {advancePaid}
            </p>
          </div>
        ) : invoiceType === "Final Invoice" ? (
          <div className="flex w-full">
            <p className="w-[50%] py-4 px-4 sm:px-8 sm:py-6 border font-worksans text-neutral-700 ">
              Advance Paid
            </p>
            <p className="w-[50%] py-4 px-4 sm:px-8 sm:py-6 border border-l-0 font-worksans text-neutral-700 ">
              {advancePaid}
            </p>
          </div>
        ) : invoiceType === "Final Receipt" ? (
          <div className="flex flex-col w-full">
            <div className="flex w-full">
              <p className="w-[50%] py-4 px-4 sm:px-8 sm:py-6 border font-worksans text-neutral-700 ">
                Advance Paid
              </p>
              <p className="w-[50%] py-4 px-4 sm:px-8 sm:py-6 border border-l-0 font-worksans text-neutral-700 ">
                {advancePaid}
              </p>
            </div>
            <div className="flex w-full">
              <p className="w-[50%] py-4 px-4 sm:px-8 sm:py-6 border border-t-0  font-worksans text-neutral-700 ">
                Final Paid
              </p>
              <p className="w-[50%] py-4 px-4 sm:px-8 sm:py-6 border border-t-0  border-l-0 font-worksans text-neutral-700 ">
                {finalPayment}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* {------------------- Payment END ---------------------} */}
      </div>
    </div>
  );
};

export default PreviewForReact;
