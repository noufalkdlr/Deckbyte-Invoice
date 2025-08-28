import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function QTYField({ item, handleData, index }) {
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
        label="QTY"
        name="itemQTY"
        value={item.itemQTY}
        onChange={(e) => handleData(index, e)}
      />
    </Box>
  );
}
