import { StyleSheet, Font } from "@react-pdf/renderer";

import MontserratSemiBold from "../../assets/fonts/Montserrat-SemiBold.ttf";
import MontserratBold from "../../assets/fonts/Montserrat-Bold.ttf";
import WorkSansRegular from "../../assets/fonts/WorkSans-Regular.ttf";

Font.register({
  family: "Montserrat",
  fonts: [
    { src: MontserratSemiBold, fontWeight: "600" },
    { src: MontserratBold, fontWeight: "bold" },
  ],
});

Font.register({
  family: "Work Sans",
  fonts: [{ src: WorkSansRegular, fontWeight: "normal" }],
});

export const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    color: "#2d2d2d",
    fontFamily: "Work Sans",
    fontSize: 12,
    fontWeight: "normal",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  main: {
    backgroundColor: "#d8d8d8",
    marginHorizontal: 38,
    marginVertical: 35,
    flex: 1,
  },
  logo: {
    width: 190,
    marginBottom: 28,
  },
  CName: {
    fontFamily: "Montserrat",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#000000",
  },
  CNameInvoice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  InvoiceNoDate: {
    flexDirection: "column",
    alignItems: "flex-end",
  },

  Invoice: {
    fontFamily: "Montserrat",
    fontSize: 18,
    fontWeight: "bold",
    color:"#cc0e4e",
    marginBottom: 3,
  },
});
