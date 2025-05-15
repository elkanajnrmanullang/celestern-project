import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ModerasiKomentar from "./pages/ModerasiKomentar";
import AksesDitolak from "./pages/AksesDitolak";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/moderasi-komentar" element={<ModerasiKomentar />} />
        <Route path="/akses-ditolak" element={<AksesDitolak />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
