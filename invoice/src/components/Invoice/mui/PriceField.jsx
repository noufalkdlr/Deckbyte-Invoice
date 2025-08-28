import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function PriceField({ item, handleData, index }) {
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
        label="Price"
        name="itemPrice"
        value={item.itemPrice}
        onChange={(e) => handleData(index, e)}
      />
    </Box>
  );
}
