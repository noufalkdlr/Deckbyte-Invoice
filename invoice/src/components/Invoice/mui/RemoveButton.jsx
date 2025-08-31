import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function RemoveButton({ index, handleRemoveItem }) {
  return (
    <Button
      variant="contained"
      color="error"
      onClick={() => handleRemoveItem(index)}
      sx={{
        width: "56px",
        height: "56px",
        minWidth: "56px",
      }}
    >
      <DeleteOutlineOutlinedIcon/>
    </Button>
  );
}
