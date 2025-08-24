import React from "react";
import { useState } from "react";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { styles } from "./styles";

import logo from "../../assets/DeckbyteLogo.png";

const InvoiceDoc = ({
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

  const totalAmount = data.reduce(
    (acc, item) => acc + Number(item.itemPrice) * Number(item.itemQTY),
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.main}>
          <View>
            <View>
              <Image src={logo} style={styles.logo} />
            </View>
          </View>
          <View style={styles.CNameInvoice}>
            <View>
              <Text style={styles.CName}>DECKBYTE DIGITAL SOLUTIONS</Text>
              <View>
                <Text style={{ marginBottom: 5 }}>
                  Kodungallur, Thrissur, Kerala, India
                </Text>
                <Text>+91 95628 66814 | www.deckbyte.in</Text>
              </View>
            </View>
            <View style={styles.InvoiceNoDate}>
              {firstInvoice || finalInvoice ? (
                <Text style={styles.InvoiceType}>INVOICE</Text>
              ) : (
                <Text style={styles.InvoiceType}>RECEIPT</Text>
              )}
              <Text style={{ marginBottom: 4 }}>
                Invoice No.: {invoiceNumber}
              </Text>
              <Text>
                Date:{" "}
                {invoiceDate ||
                  new Date().toLocaleDateString("en-GB").replaceAll("/", "-")}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.BillTo}>BILL TO:</Text>
            <Text style={{ marginBottom: 8 }}>
              {billTo.client || "Tamara Resto Bar"}
            </Text>
            <Text style={{ marginBottom: 8 }}>
              {billTo.address ||
                `Thrissur, Kodungallur ${"\n"}Kerala, India, 680666`}
            </Text>
            <Text>{billTo.phone || "+91 974646 9319"}</Text>
          </View>
          <View style={styles.Table}>
            {/* Table Header */}
            <View style={styles.TableHeader}>
              <Text style={{ flex: 4 }}>DESCRIPTION</Text>
              <Text style={{ flex: 1, textAlign: "center" }}>QTY</Text>
              <Text style={{ flex: 1, textAlign: "center" }}>PRICE</Text>
              <Text style={{ flex: 1, textAlign: "right" }}>TOTAL</Text>
            </View>

            {/* Table Body */}
            <View style={styles.TableBody}>
              {data.map((item, index) => (
                <View key={index} style={styles.TableItems}>
                  <Text style={{ flex: 4 }}>{item.itemName || "logo"}</Text>
                  <Text style={{ flex: 1, textAlign: "center" }}>
                    {item.itemQTY || 2}
                  </Text>
                  <Text style={{ flex: 1, textAlign: "center" }}>
                    {item.itemPrice || 3000}
                  </Text>
                  <Text style={{ flex: 1, textAlign: "right" }}>
                    {Number(item.itemPrice) * Number(item.itemQTY)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.summaryBox}>
            {firstInvoice ? (
              
                <View style={styles.summaryRow}>
                  <View style={{flexDirection:"row", justifyContent:"space-between", borderBottom:.25, paddingBottom:8,}}>
                    <Text>Subtotal</Text>
                    <Text style={{textAlign:"right", }}>₹{totalAmount}</Text>
                  </View>

                  <View style={{flexDirection:"row", justifyContent:"space-between", borderBottom:.25, paddingVertical:8,}}>
                    <Text>Advance Amount</Text>
                    <Text style={{textAlign:"right", }}>₹{advanceAmount || 0}</Text>
                  </View>

                  <View style={{flexDirection:"row", justifyContent:"space-between", paddingTop:8,}}>
                    <Text>Balance Due</Text>
                    <Text style={{textAlign:"right", fontFamily:"Work Sans", fontSize: 14, fontWeight: "600", color:"#000", }}>₹{totalAmount - advanceAmount}/-</Text>
                  </View>
                </View>
              
            ) : null}
             {firstReceipt ? (
              
                <View style={styles.summaryRow}>
                  <View style={{flexDirection:"row", justifyContent:"space-between", borderBottom:.25, paddingBottom:8,}}>
                    <Text>Total Invoice Amount</Text>
                    <Text style={{textAlign:"right", }}>₹{totalAmount}</Text>
                  </View>

                  <View style={{flexDirection:"row", justifyContent:"space-between", borderBottom:.25, paddingVertical:8,}}>
                    <Text>Advance Received</Text>
                    <Text style={{textAlign:"right", }}>₹{advancePaid || 0}</Text>
                  </View>

                  <View style={{flexDirection:"row", justifyContent:"space-between", paddingTop:8,}}>
                    <Text>Balance Due</Text>
                    <Text style={{textAlign:"right", fontFamily:"Work Sans", fontSize: 14, fontWeight: "600", color:"#000", }}>₹{totalAmount - advancePaid}/-</Text>
                  </View>
                </View>
              
            ) : null}
            {finalInvoice ? (
              
                <View style={styles.summaryRow}>
                  <View style={{flexDirection:"row", justifyContent:"space-between", borderBottom:.25, paddingBottom:8,}}>
                    <Text>Total Invoice Amount</Text>
                    <Text style={{textAlign:"right", }}>₹{totalAmount}</Text>
                  </View>

                  <View style={{flexDirection:"row", justifyContent:"space-between", borderBottom:.25, paddingVertical:8,}}>
                    <Text>Advance Paid</Text>
                    <Text style={{textAlign:"right", }}>₹{advancePaid || 0}</Text>
                  </View>

                  <View style={{flexDirection:"row", justifyContent:"space-between", paddingTop:8,}}>
                    <Text>Balance Due</Text>
                    <Text style={{textAlign:"right", fontFamily:"Work Sans", fontSize: 14, fontWeight: "600", color:"#000", }}>₹{totalAmount - advancePaid}/-</Text>
                  </View>
                </View>
              
            ) : null}
            {finalReceipt ? (
              
                <View style={styles.summaryRow}>
                  <View style={{flexDirection:"row", justifyContent:"space-between", borderBottom:.25, paddingBottom:8,}}>
                    <Text>Total Invoice Amount</Text>
                    <Text style={{textAlign:"right", }}>₹{totalAmount}</Text>
                  </View>

                  <View style={{flexDirection:"row", justifyContent:"space-between", borderBottom:.25, paddingVertical:8,}}>
                    <Text>Advance Paid</Text>
                    <Text style={{textAlign:"right", }}>₹{advancePaid || 0}</Text>
                  </View>

                  <View style={{flexDirection:"row", justifyContent:"space-between", borderBottom:.25, paddingVertical:8,}}>
                    <Text>Final Payment Received</Text>
                    <Text style={{textAlign:"right", }}>₹{finalPayment || 0}</Text>
                  </View>

                  <View style={{flexDirection:"row", justifyContent:"space-between", paddingTop:8,}}>
                    <Text>Balance Due</Text>
                    <Text style={{textAlign:"right", fontFamily:"Work Sans", fontSize: 14, fontWeight: "600", color:"#000", }}>₹{totalAmount - finalPayment - advancePaid}/-</Text>
                  </View>
                </View>
              
            ) : null}
          </View>
          <View style={styles.bottom}>
            <View style={styles.bottomLine} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDoc;
