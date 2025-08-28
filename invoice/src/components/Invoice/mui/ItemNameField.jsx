import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function ItemNameField({ item, handleData, index }) {
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
        label="Item Name"
        name="itemName"
        value={item.itemName}
        onChange={(e) => handleData(index, e)}
      />
    </Box>
  );
}
