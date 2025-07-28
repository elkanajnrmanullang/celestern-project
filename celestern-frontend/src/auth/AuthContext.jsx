import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (
      (username === "admin" && password === "admin123") ||
      (username === "jurnalis" && password === "jurnalis123")
    ) {
      const role = username === "admin" ? "admin" : "jurnalis";
      const dummyUser = {
        id: username === "admin" ? 1 : 2, // ID sesuai yang ada di database
        username,
        role,
        token: "DUMMY-TOKEN", // optional kalau sudah pakai Sanctum
      };
      setUser(dummyUser);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
