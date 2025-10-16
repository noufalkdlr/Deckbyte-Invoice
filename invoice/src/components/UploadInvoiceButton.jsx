import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useGoogleAuth } from "../GoogleAuthContext";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const UploadInvoiceButton = ({ pdfBlob, fileName }) => {
  const { token, logout } = useGoogleAuth();
  const [uploading, setUploading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const FOLDER_ID = "1bFRrK-Hpe1p13uQIRzV5dACUBBeaLuOx";

  // ✅ Listen for auto-logout (from context)
  useEffect(() => {
    const handleLogout = () => {
      setSnackbar({
        open: true,
        message: "⚠️ Google session expired. Please log in again.",
        severity: "warning",
      });
    };

    window.addEventListener("googleLogout", handleLogout);
    return () => window.removeEventListener("googleLogout", handleLogout);
  }, []);

  // ✅ Upload Function
  const uploadFile = async () => {
    if (!token) {
      setSnackbar({
        open: true,
        message: "⚠️ Please login first",
        severity: "warning",
      });
      return;
    }

    setUploading(true);

    const metadata = {
      name: fileName || "invoice.pdf",
      mimeType: "application/pdf",
      parents: [FOLDER_ID],
    };

    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    form.append("file", pdfBlob);

    try {
      const res = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        }
      );

      if (res.status === 401 || res.status === 403) {
        setSnackbar({
          open: true,
          message: "⚠️ Session expired. Please log in again.",
          severity: "error",
        });
        logout();
        return;
      }

      const data = await res.json();
      console.log("Uploaded:", data);

      setSnackbar({
        open: true,
        message: "✅ Uploaded to Google Drive (Invoices folder)!",
        severity: "success",
      });
    } catch (err) {
      console.error("Upload failed:", err);
      setSnackbar({
        open: true,
        message: "❌ Upload failed. Please try again.",
        severity: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  // Hide button if not logged in
  if (!pdfBlob || !token) return null;

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={uploadFile}
        sx={{ height: "56px", whiteSpace: "nowrap" }}
        startIcon={!uploading && <AddToDriveIcon />}
      >
        {uploading ? (
          <>
            <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
            Uploading...
          </>
        ) : (
          "Upload to Drive"
        )}
      </Button>

      {/* Snackbar for alerts */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default UploadInvoiceButton;
