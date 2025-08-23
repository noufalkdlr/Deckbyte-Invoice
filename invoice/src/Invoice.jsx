import { useState } from "react";
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
export const InvoicePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);


const Invoice = ({
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
    <>
      <div className="w-screen h-[1200px] ">
        <PDFViewer width='100%' height='100%'>
            <InvoicePDF/>
        </PDFViewer>
      </div>
    </>
  );
};

export default Invoice;
