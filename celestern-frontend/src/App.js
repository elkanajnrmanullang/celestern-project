import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AksesDitolak from "./pages/AksesDitolak";
import TambahBerita from "./pages/berita/TambahBerita";
import DaftarBerita from "./pages/berita/DaftarBerita";
import JadwalTayang from "./pages/berita/JadwalTayang";
import KategoriBerita from "./pages/berita/KategoriBerita";
import ModerasiKomentar from "./pages/ModerasiKomentar";
import PengaturanKomentar from "./pages/PengaturanKomentar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/pengaturan-komentar"
            element={<PengaturanKomentar />}
          />

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

          {/* Moderasi Komentar - sementara tanpa role admin */}
          <Route
            path="/admin/moderasi-komentar"
            element={
              <ProtectedRoute>
                <ModerasiKomentar />
              </ProtectedRoute>
            }
          />

          {/* Fallback & Unauthorized */}
          <Route path="/akses-ditolak" element={<AksesDitolak />} />
          <Route path="*" element={<div>404 - Halaman tidak ditemukan</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
