import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import { Navigate } from "react-router-dom";

// Pages Admin
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AksesDitolak from "./pages/AksesDitolak";
import TambahBerita from "./pages/berita/TambahBerita";
import DaftarBerita from "./pages/berita/DaftarBerita";
import KategoriBerita from "./pages/berita/KategoriBerita";
import JadwalTayang from "./pages/berita/JadwalTayang";
import ModerasiKomentar from "./pages/ModerasiKomentar";
import RingkasanStatistik from "./pages/statistik/RingkasanStatistik";
import StatistikBerita from "./pages/statistik/StatistikBerita";
import StatistikJurnalis from "./pages/statistik/StatistikJurnalis";

// Pages Publik (Portal)
// import Home from "./public-pages/Home";
// import Detail from "./public-pages/Detail";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Portal Publik */}
          {/* <Route path="/" element={<Home />} />
          <Route path="/berita/:slug" element={<Detail />} /> */}

          {/* Admin Panel */}
          <Route path="/login" element={<Login />} />
          <Route path="/akses-ditolak" element={<AksesDitolak />} />

          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/berita/tambah" element={
            <ProtectedRoute><TambahBerita /></ProtectedRoute>
          } />
          <Route path="/berita/daftar" element={
            <ProtectedRoute><DaftarBerita /></ProtectedRoute>
          } />
          <Route path="/berita/kategori" element={
            <ProtectedRoute><KategoriBerita /></ProtectedRoute>
          } />
          <Route path="/berita/jadwal" element={
            <ProtectedRoute><JadwalTayang /></ProtectedRoute>
          } />
          <Route path="/admin/moderasi-komentar" element={
            <ProtectedRoute><ModerasiKomentar /></ProtectedRoute>
          } />
          <Route path="/admin/statistik/ringkasan" element={
            <ProtectedRoute><RingkasanStatistik /></ProtectedRoute>
          } />
          <Route path="/admin/statistik/berita" element={
            <ProtectedRoute><StatistikBerita /></ProtectedRoute>
          } />
          <Route path="/admin/statistik/jurnalis" element={
            <ProtectedRoute><StatistikJurnalis /></ProtectedRoute>
          } />

          {/* <Route path="/kategori/:slug" element={<Home />} /> */}


          {/* Fallback */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<div>404 - Halaman tidak ditemukan</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
