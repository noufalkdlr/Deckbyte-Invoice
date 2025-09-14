import React, { useState } from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";

function GoogleDriveUpload({ pdfBlob }) {
  const [token, setToken] = useState(null);

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/drive.file",
    flow: "implicit", // 👈 ensures we get access_token directly
    onSuccess: (response) => {
      console.log("Login Success:", response);
      setToken(response.access_token); // ✅ now we get access_token
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  const uploadFile = async () => {
    if (!token) {
      alert("Please login first");
      return;
    }

    const metadata = {
      name: "invoice.pdf",
      mimeType: "application/pdf",
    };

    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    form.append("file", pdfBlob);

    const res = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      }
    );

    const data = await res.json();
    console.log("Uploaded:", data);
    alert("✅ Uploaded to Google Drive!\nFile ID: " + data.id);
  };

  return (
    <div>
      {!token ? (
        <button onClick={() => login()}>Login with Google</button>
      ) : (
        <>
          <button onClick={() => { googleLogout(); setToken(null); }}>Logout</button>
          <button onClick={uploadFile}>Upload Invoice</button>
        </>
      )}
    </div>
  );
}

export default GoogleDriveUpload;
