import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Buffer } from "buffer";
import { registerSW } from "virtual:pwa-register";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleAuthProvider } from "./GoogleAuthContext.jsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

registerSW();

window.Buffer = Buffer;

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <GoogleOAuthProvider clientId="733592717403-75pktasl272uma0c8ovmfm443gdthf78.apps.googleusercontent.com">
        <GoogleAuthProvider>
          <App />
        </GoogleAuthProvider>
      </GoogleOAuthProvider>
    </StrictMode>
  </BrowserRouter>
);
