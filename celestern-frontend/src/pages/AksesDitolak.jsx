import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Lock } from "lucide-react"; 

const AksesDitolak = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Area Konten */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Konten */}
        <main className="flex flex-col items-center justify-center flex-1 bg-white p-6">
          {/* Icon Kunci */}
          <Lock size={80} className="text-black mb-6" />

          {/* Teks Akses Ditolak */}
          <h1 className="text-4xl font-bold text-black mb-2">Akses Ditolak</h1>

          {/* Sub-teks */}
          <p className="text-gray-600 italic mb-6">
            Anda tidak memiliki izin untuk mengakses halaman ini
          </p>

          {/* Tombol Kembali ke Dashboard */}
          <a
            href="/dashboard"
            className="bg-black text-white px-6 py-2 rounded hover:bg-white hover:text-black border border-black transition font-semibold"
          >
            Kembali ke Dashboard
          </a>

          {/* Footer */}
          <footer className="absolute bottom-4 text-xs text-gray-500 italic">
            2025 © The Celestern Times
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AksesDitolak;
