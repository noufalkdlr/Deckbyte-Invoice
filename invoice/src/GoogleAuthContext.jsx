import React, { createContext, useContext, useState, useEffect } from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";

const GoogleAuthContext = createContext();

export const GoogleAuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("google_token"));
  const [expiry, setExpiry] = useState(() => localStorage.getItem("google_token_expiry"));

const login = useGoogleLogin({
  scope: "https://www.googleapis.com/auth/drive.file",
  flow: "implicit",
  onSuccess: (res) => {
    console.log("✅ Login success:", res);
    const accessToken = res.access_token;
    const expiresIn = res.expires_in || 3600; // ⏱️ Use Google's value or fallback to 1 hour
    const expiryTime = Date.now() + expiresIn * 1000;

    setToken(accessToken);
    setExpiry(expiryTime);
    localStorage.setItem("google_token", accessToken);
    localStorage.setItem("google_token_expiry", expiryTime);
  },
  onError: () => {
    console.log("❌ Google login failed");
  },
});


  // 🚪 Logout (also updates PWA UI instantly)
  const logout = () => {
    googleLogout();
    setToken(null);
    setExpiry(null);
    localStorage.removeItem("google_token");
    localStorage.removeItem("google_token_expiry");
    window.dispatchEvent(new Event("googleLogout")); // notify PWA/UI
    console.log("👋 Logged out (token expired or user logout)");
  };

  // ⏱️ Auto logout when token expires
  useEffect(() => {
    if (!token || !expiry) return;

    const now = Date.now();
    const timeLeft = expiry - now;

    if (timeLeft <= 0) {
      logout();
      return;
    }

    const timer = setTimeout(() => {
      logout();
    }, timeLeft);

    return () => clearTimeout(timer);
  }, [expiry, token]);

  // 🧠 Optional: Validate token every 10 min
  useEffect(() => {
    const validateToken = async () => {
      if (!token) return;
      try {
        const res = await fetch(
          `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`
        );
        if (!res.ok) logout();
      } catch {
        logout();
      }
    };

    const interval = setInterval(validateToken, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <GoogleAuthContext.Provider value={{ token, login, logout }}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useGoogleAuth = () => useContext(GoogleAuthContext);
