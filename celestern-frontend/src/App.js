import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import RoleRoute from "./auth/RoleRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AksesDitolak from "./pages/AksesDitolak";
import TambahBerita from "./pages/berita/TambahBerita";
import DaftarBerita from "./pages/berita/DaftarBerita";
import JadwalTayang from "./pages/berita/JadwalTayang";
import KategoriBerita from "./pages/berita/KategoriBerita";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
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

          {/* Tambah Berita Routes */}
          <Route
            path="/berita/tambah"
            element={
              <ProtectedRoute>
                <TambahBerita />
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

          {/* Daftar Berita Routes */}
          <Route
            path="/berita/daftar"
            element={
              <ProtectedRoute>
                <DaftarBerita />
              </ProtectedRoute>
            }
          />

          {/* Contoh Role khusus Admin */}
          <Route
            path="/admin-page"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <h1>Halaman Khusus Admin</h1>
              </RoleRoute>
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

          {/* Akses Ditolak */}
          <Route path="/akses-ditolak" element={<AksesDitolak />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
