import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages & Components
import Home from "./pages/Home";
import Login from "./pages/Login";
import KategoriPage from "./pages/KategoriPage";
import DetailBerita from "./components/Detail/DetailBerita";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Toast notification container - HARUS di luar Routes */}
        <ToastContainer position="top-center" autoClose={2000} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/kategori/:slug" element={<KategoriPage />} />
          <Route path="/berita/:slug" element={<DetailBerita />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
