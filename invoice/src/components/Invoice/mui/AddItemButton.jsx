import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function AddItemButton({handleAddItem}) {
  return (
    <Button
      variant="contained"
      color="success"
      onClick={handleAddItem}
      sx={{
        width: "100%",
        height: "56px",
        whiteSpace: "nowrap",
      }}
    >
      ADD NEW ITEM
    </Button>
  );
}
