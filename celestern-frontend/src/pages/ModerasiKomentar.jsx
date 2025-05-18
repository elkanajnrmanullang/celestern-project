import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const STATUS_FILTERS = ["semua", "tampil", "spam", "tersembunyi"];
const ITEMS_PER_PAGE = 30;

export default function ModerasiKomentar() {
  const [komentars, setKomentars] = useState([]);
  const [filterStatus, setFilterStatus] = useState("semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyData = Array.from({ length: 45 }, (_, i) => ({
      id: i + 1,
      nama: "Ronald Jnr",
      isi: "Semua komentar akan ditampilkan disini apapun itu",
      berita: {
        id: 1,
        judul: "Judul Berita Hari Ini"
      },
      tanggal: "8 April 2025",
      status: i % 3 === 0 ? "tampil" : i % 3 === 1 ? "spam" : "tersembunyi",
    }));

    setKomentars(dummyData);
    setLoading(false);
  }, []);

  const handleAction = (id, status) => {
    setKomentars((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status } : k))
    );
  };

  const handleDelete = (id) => {
    const konfirmasi = window.confirm("Apakah Anda yakin ingin menghapus komentar ini?");
    if (!konfirmasi) return;
    setKomentars((prev) => prev.filter((k) => k.id !== id));
  };

  const filtered =
    filterStatus === "semua"
      ? komentars
      : komentars.filter((k) => k.status === filterStatus);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentData = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) return <p style={{ color: "white" }}>Memuat komentar...</p>;

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="ml-64 mt-20 p-6">
        <h2 className="text-xl font-bold mb-4">Moderasi Komentar</h2>

        <div className="flex gap-2 mb-4">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              className={`px-4 py-1 rounded ${
                filterStatus === status
                  ? "bg-black text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setFilterStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <table className="w-full text-left border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Nama Pengguna</th>
              <th className="p-2 border">Komentar</th>
              <th className="p-2 border">Link Berita</th>
              <th className="p-2 border">Tgl Komentar</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((k) => (
              <tr key={k.id} className="border">
                <td className="p-2 border font-semibold">{k.nama}</td>
                <td className="p-2 border">{k.isi}</td>
                <td className="p-2 border">
                  <a
                    href={`https://tctimes.com/berita/${k.berita.id}`}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {k.berita.judul}
                  </a>
                </td>
                <td className="p-2 border">{k.tanggal}</td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      k.status === "tampil"
                        ? "bg-green-500 text-white"
                        : k.status === "spam"
                        ? "bg-red-600 text-white"
                        : "border border-black"
                    }`}
                  >
                    {k.status.charAt(0).toUpperCase() + k.status.slice(1)}
                  </span>
                </td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleDelete(k.id)}
                    title="Hapus Komentar"
                  >
                    🗑️
                  </button>
                  <button
                    onClick={() => handleAction(k.id, "tersembunyi")}
                    title="Sembunyikan Komentar"
                  >
                    🙈
                  </button>
                  <button
                    onClick={() => handleAction(k.id, "spam")}
                    title="Tandai sebagai SPAM"
                  >
                    ⚠️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 rounded-full border ${
                currentPage === num ? "bg-black text-white" : "bg-white"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
