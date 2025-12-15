import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  // const [user, setUser] = useState(
  //   JSON.parse(localStorage.getItem("user") || "null")
  // );

  const login = (token) => {
    setToken(token);
    // setUser(user);
    localStorage.setItem("token", token);
    // localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    // setUser(null);
    localStorage.clear();
    console.log("Logout Called");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
