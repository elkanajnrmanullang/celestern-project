import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ Tambahkan flag loading

  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false); // ✅ Set setelah localStorage dibaca
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem("auth_user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth_user");
    }
  }, [user]);

  const login = async (username, password) => {
    try {
      const response = await api.post("/admin-login", {
        username,
        password,
      });

      const { token, username, id, role } = response.data;

      const authData = {
        token,
        username,
        id,
        role,
      };

      setUser(authData);
      toast.success("✅ Login berhasil!");
      return true;
    } catch (err) {
      toast.error("❌ Login gagal. Periksa username & password.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    toast.info("🚪 Logout berhasil.");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
