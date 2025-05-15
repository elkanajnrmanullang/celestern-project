import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ModerasiKomentar from "./pages/ModerasiKomentar";
import AksesDitolak from "./pages/AksesDitolak";

import { useAuth } from "./hooks/useAuth";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/admin/moderasi-komentar"
          element={
            user?.role === "admin" ? <ModerasiKomentar /> : <AksesDitolak />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
