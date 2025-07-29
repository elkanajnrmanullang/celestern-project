import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="text-center text-white mt-20">⏳ Memuat...</div>; // ✅ Bisa diganti spinner
  }

  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
