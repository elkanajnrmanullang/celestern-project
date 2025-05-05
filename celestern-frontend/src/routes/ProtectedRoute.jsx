import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

// Komponen ProtectedRoute
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = getCurrentUser();

  if (!user) {
    // Kalau belum login, arahkan ke halaman login
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Kalau role tidak diizinkan, arahkan ke akses ditolak
    return <Navigate to="/akses-ditolak" replace />;
  }

  // Kalau role cocok, izinkan masuk
  return children;
};

export default ProtectedRoute;
