import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

const login = async (inputs) => {
  try {
    const res = await makeRequest.post("/auth/login", inputs);
    localStorage.setItem("accessToken", res.data.token);
    setCurrentUser(res.data); // Must update context
  } catch (err) {
    throw err;
  }
};

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
