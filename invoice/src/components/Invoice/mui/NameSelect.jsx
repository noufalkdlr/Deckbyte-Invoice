import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function NameSelect({ billTo, handleBillTo }) {
  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { width: "100%" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        variant="outlined"
        label="Client Name"
        name="client"
        value={billTo.client}
        onChange={handleBillTo}
      />
    </Box>
  );
}
