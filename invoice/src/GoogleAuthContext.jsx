import React, { createContext, useContext, useState, useEffect } from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";

const GoogleAuthContext = createContext();

export const GoogleAuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("google_token") || null;
  });

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/drive.file",
    flow: "implicit",
    onSuccess: (res) => {
      console.log("Login Success:", res);
      setToken(res.access_token);

      localStorage.setItem("google_token", res.access_token);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  const logout = () => {
    googleLogout();
    setToken(null);
    localStorage.removeItem("google_token");
  };

  useEffect(() => {
    if (token) {
      const timer = setTimeout(() => {
        console.log("Token expired, logging out");
        logout();
      }, 60 * 60 * 1000); // 1 hour
      return () => clearTimeout(timer);
    }
  }, [token]);

  return (
    <GoogleAuthContext.Provider value={{ token, login, logout }}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useGoogleAuth = () => useContext(GoogleAuthContext);
