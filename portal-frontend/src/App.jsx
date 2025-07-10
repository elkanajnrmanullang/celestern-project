import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./Auth/AuthContext";

// Pages & Components
import Home from "./pages/Home";
import Login from "./pages/Login";
import KategoriPage from "./pages/KategoriPage";
import DetailBerita from "./components/Detail/DetailBerita";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router>
          <ToastContainer position="top-center" autoClose={2000} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/kategori/:slug" element={<KategoriPage />} />
            <Route path="/berita/:slug" element={<DetailBerita />} />
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
