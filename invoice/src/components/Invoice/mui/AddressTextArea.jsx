import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function AddressTextArea({ billTo, handleBillTo }) {
  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { width: "100%" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-multiline-flexible"
        label="Address"
        name="address"
        value={billTo.address}
        onChange={handleBillTo}
        multiline
        rows={3}
        maxRows={4}
      />
    </Box>
  );
}
