import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function PaymentField({
  payment,
  handleFunction,
  label
}) {
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
        label={label}
        value={payment}
        onChange={handleFunction}
      />
    </Box>
  );
}
