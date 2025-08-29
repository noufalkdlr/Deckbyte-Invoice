import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { styles } from "./styles";

import logo from "../../assets/DeckbyteLogo.png";

const FinalInvoiceDoc = ({
  data,
  billTo,
  invoiceDate,
  advancePaid,
  invoiceType,
  advanceAmount,
  finalPayment,
  invoiceNumber,
}) => {


const totalAmount = (data || []).reduce(
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
              <Text style={styles.CName}>DECKBYTE TECHNOLOGIES</Text>
              <View>
                <Text style={{ marginBottom: 5 }}>
                  Kodungallur, Thrissur, Kerala, India
                </Text>
                <Text>+91 95628 66814 | www.deckbyte.in</Text>
              </View>
            </View>
            <View style={styles.InvoiceNoDate}>
                <Text style={styles.InvoiceType}>INVOICE</Text>

              <Text style={{ marginBottom: 4 }}>
                Invoice No.: {invoiceNumber}
              </Text>
              <Text>
                Date:{" "}
                {invoiceDate}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.BillTo}>BILL TO:</Text>
            <Text style={{ marginBottom: 8 }}>
              {billTo.client}
            </Text>
            <Text style={{ marginBottom: 8 }}>
              {billTo.address}
            </Text>
            <Text>{billTo.phone}</Text>
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
                  <Text style={{ flex: 4 }}>{item.itemName}</Text>
                  <Text style={{ flex: 1, textAlign: "center" }}>
                    {item.itemQTY}
                  </Text>
                  <Text style={{ flex: 1, textAlign: "center" }}>
                    {item.itemPrice}
                  </Text>
                  <Text style={{ flex: 1, textAlign: "right" }}>
                    {Number(item.itemPrice) * Number(item.itemQTY)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.summaryBox}>

              
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
                    <Text style={{textAlign:"right", fontFamily:"Work Sans", fontSize: 14, fontWeight: "600", color:"#000", }}>₹{totalAmount - Number(advancePaid || 0)}/-</Text>
                  </View>
                </View>
            
          </View>
          <View style={styles.bottom}>
            <View style={styles.bottomLine} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default FinalInvoiceDoc;
