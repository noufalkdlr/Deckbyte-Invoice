import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
dayjs.locale("en-gb");

export default function DateSelect({ rawDate, handleInvoiceDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Date"
        format="DD/MM/YY"
        value={rawDate ? dayjs(rawDate): null}
        onChange={(newValue)=>{
            if(!newValue) return;
            const isoDate = newValue.format("YYYY-MM-DD");
            handleInvoiceDate(isoDate);
        }}
        slotProps={{
          textField: {
            helperText: "Blank to Use Today",
          },
        }}
      />
    </LocalizationProvider>
  );
}
