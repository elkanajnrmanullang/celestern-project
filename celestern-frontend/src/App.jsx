import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

// Pages Admin
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AksesDitolak from "./pages/AksesDitolak";

// Manajemen Berita
import TambahBerita from "./pages/berita/TambahBerita";
import DaftarBerita from "./pages/berita/DaftarBerita";
import KategoriBerita from "./pages/berita/KategoriBerita";
import JadwalTayang from "./pages/berita/JadwalTayang";

// Moderasi & Statistik
import ModerasiKomentar from "./pages/ModerasiKomentar";
import RingkasanStatistik from "./pages/statistik/RingkasanStatistik";
import StatistikBerita from "./pages/statistik/StatistikBerita";
import StatistikJurnalis from "./pages/statistik/StatistikJurnalis";

// Monetisasi & Iklan
import SlotIklan from "./pages/admin/iklan/SlotIklan";
import IntegrasiAdSense from "./pages/admin/iklan/IntegrasiAdSense";
import StatistikIklan from "./pages/admin/iklan/StatistikIklan";

// Keamanan & Backup
import KeamananSistem from "./pages/admin/keamanan/KeamananSistem";
import BackupRestore from "./pages/admin/keamanan/BackupRestore";

// Manajemen Pengguna
import DaftarPengguna from "./pages/admin/pengguna/DaftarPengguna";
import TambahPengguna from "./pages/admin/pengguna/TambahPengguna";
import PengaturanAkses from "./pages/admin/pengguna/PengaturanAkses";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/akses-ditolak" element={<AksesDitolak />} />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Manajemen Berita */}
          <Route
            path="/berita/tambah"
            element={
              <ProtectedRoute>
                <TambahBerita />
              </ProtectedRoute>
            }
          />
          <Route
            path="/berita/daftar"
            element={
              <ProtectedRoute>
                <DaftarBerita />
              </ProtectedRoute>
            }
          />
          <Route
            path="/berita/kategori"
            element={
              <ProtectedRoute>
                <KategoriBerita />
              </ProtectedRoute>
            }
          />
          <Route
            path="/berita/jadwal"
            element={
              <ProtectedRoute>
                <JadwalTayang />
              </ProtectedRoute>
            }
          />

          {/* Moderasi & Statistik */}
          <Route
            path="/admin/moderasi-komentar"
            element={
              <ProtectedRoute>
                <ModerasiKomentar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/statistik/ringkasan"
            element={
              <ProtectedRoute>
                <RingkasanStatistik />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/statistik/berita"
            element={
              <ProtectedRoute>
                <StatistikBerita />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/statistik/jurnalis"
            element={
              <ProtectedRoute>
                <StatistikJurnalis />
              </ProtectedRoute>
            }
          />

          {/* Monetisasi & Iklan */}
          <Route
            path="/admin/iklan/slot"
            element={
              <ProtectedRoute>
                <SlotIklan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/iklan/integrasi"
            element={
              <ProtectedRoute>
                <IntegrasiAdSense />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/iklan/statistik"
            element={
              <ProtectedRoute>
                <StatistikIklan />
              </ProtectedRoute>
            }
          />

          {/* Keamanan & Backup */}
          <Route
            path="/admin/keamanan/sistem"
            element={
              <ProtectedRoute>
                <KeamananSistem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/keamanan/backup"
            element={
              <ProtectedRoute>
                <BackupRestore />
              </ProtectedRoute>
            }
          />

          {/* Manajemen Pengguna */}
          <Route
            path="/admin/pengguna/daftar"
            element={
              <ProtectedRoute>
                <DaftarPengguna />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pengguna/tambah"
            element={
              <ProtectedRoute>
                <TambahPengguna />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pengguna/akses"
            element={
              <ProtectedRoute>
                <PengaturanAkses />
              </ProtectedRoute>
            }
          />

          {/* Default & 404 */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<div>404 - Halaman tidak ditemukan</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
