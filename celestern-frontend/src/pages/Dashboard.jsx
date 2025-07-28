import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Konten Kanan */}
      <div className="flex flex-col flex-1 ml-64">
        <Header />

        <main className="pt-20 px-8 min-h-screen bg-gray-100">
          {/* Statistik Atas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-blue-900 text-white p-6 rounded shadow text-center">
              <p className="text-lg font-semibold">Total Berita Tayang</p>
              <p className="text-4xl font-bold mt-2">192</p>
            </div>
            <div className="bg-blue-900 text-white p-6 rounded shadow text-center">
              <p className="text-lg font-semibold">Total Komentar</p>
              <p className="text-4xl font-bold mt-2">852</p>
            </div>
            <div className="bg-blue-900 text-white p-6 rounded shadow text-center">
              <p className="text-lg font-semibold">Total Pengunjung</p>
              <p className="text-4xl font-bold mt-2">190,684</p>
            </div>
          </div>

          {/* Tabel Berita Terpopuler */}
          <div className="bg-white rounded shadow p-6 mb-10">
            <h2 className="text-lg font-bold mb-4">Berita Terpopuler</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-blue-600 text-white text-left">
                    <th className="px-4 py-2">Judul Berita</th>
                    <th className="px-4 py-2">Kategori</th>
                    <th className="px-4 py-2">Views</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((i) => (
                    <tr key={i} className="border-t">
                      <td className="px-4 py-2">
                        Daftar Negara Kena Dampak Paling Ringan dari Kebijakan Tarif Trump
                      </td>
                      <td className="px-4 py-2">Internasional</td>
                      <td className="px-4 py-2">1,649.876</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Grafik Trafik Pengunjung */}
          <div className="bg-white rounded shadow p-6 mb-10">
            <h2 className="text-lg font-bold mb-4">Trafik Pengunjung</h2>
            <div className="flex space-x-4 mb-4">
              <button className="px-4 py-1 bg-yellow-100 rounded">Day</button>
              <button className="px-4 py-1 bg-yellow-100 rounded">Week</button>
              <button className="px-4 py-1 bg-yellow-300 rounded font-semibold">Month</button>
            </div>
            {/* Placeholder grafik */}
            <div className="h-48 flex items-center justify-center text-gray-400 italic">
              (Grafik Chart.js atau Recharts bisa dimasukkan di sini)
            </div>
          </div>

          {/* Manajemen Berita & Komentar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Berita Baru */}
            <div className="bg-white rounded shadow p-6">
              <h2 className="text-lg font-bold mb-4">Berita Yang Baru Diposting</h2>
              <img
                src="https://cdn.cnnindonesia.com/cnnid/images/og-default.jpg"
                alt="Berita terbaru"
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="font-semibold text-md mb-4 leading-snug">
                10 Barang Ekspor RI ke AS Berpotensi Paling Terdampak Tarif Trump
              </h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 bg-yellow-100 hover:bg-yellow-200 text-black py-2 rounded">
                  ➕ Tambah Berita
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-yellow-50 hover:bg-yellow-100 text-black py-2 rounded">
                  🖉 Edit Berita
                </button>
              </div>
            </div>

            {/* Komentar */}
            <div className="bg-white rounded shadow p-6">
              <h2 className="text-lg font-bold mb-4">Komentar</h2>
              <ul className="space-y-4 max-h-72 overflow-y-auto pr-2">
                {[...Array(6)].map((_, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <img
                      src="https://api.dicebear.com/7.x/adventurer/svg?seed=user"
                      alt="user"
                      className="w-10 h-10 rounded-full"
                    />
                    <p className="text-sm">
                      Berita yang sangat menarik dan disajikan dengan lengkap
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Monetisasi */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-4">Monetisasi & Iklan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-blue-900 text-white p-6 rounded shadow text-center">
                <p className="italic text-sm">Penghasilan Bulan Ini</p>
                <p className="text-3xl font-bold mt-1">$71,2k</p>
              </div>
              <div className="bg-blue-900 text-white p-6 rounded shadow text-center">
                <p className="italic text-sm">Penghasilan Hari ini</p>
                <p className="text-3xl font-bold mt-1">$5,4k</p>
              </div>
              <div className="bg-blue-900 text-white p-6 rounded shadow text-center">
                <p className="italic text-sm">Rata - Rata Penghasilan</p>
                <p className="text-3xl font-bold mt-1">$2,4k</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
