import React from 'react'
import { useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  Image,
} from "@react-pdf/renderer";
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

    return  (
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
                <Text style={styles.Invoice}>INVOICE</Text>
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
              <Text>BILL TO:</Text>
              <Text>{billTo.client || "Name"}</Text>
              {billTo.address ? (
                billTo.address
                  .split("\n")
                  .map((line, i) => <Text key={i}>{line}</Text>)
              ) : (
                <Text>Address</Text>
              )}
              <Text>{billTo.phone}</Text>
            </View>
          </View>
        </Page>
      </Document>
  )
}



export default InvoiceDoc